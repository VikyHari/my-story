import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let cssInjected = false;
function injectDarkMapStyles() {
  if (cssInjected) return;
  cssInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    .olu-dark-map .leaflet-tile-pane {
      filter: invert(1) hue-rotate(180deg) brightness(0.85) saturate(0.65) contrast(0.92);
    }
    .olu-dark-map { background: #0a1420 !important; }
    .olu-dark-map .leaflet-control-attribution {
      font-size: 8px !important;
      background: rgba(5,10,17,0.6) !important;
      color: rgba(255,255,255,0.45) !important;
      padding: 1px 4px !important;
    }
    .olu-dark-map .leaflet-control-attribution a { color: rgba(255,255,255,0.6) !important; }
    .olu-dark-map .leaflet-control-zoom { display: none; }
  `;
  document.head.appendChild(style);
}

/**
 * A real, non-interactive OpenStreetMap view (no API key required) centered
 * on a configured location — used for the local/city/country stages of the
 * Love Meter's infinity zoom-out sequence. Purely decorative: interaction is
 * disabled so it never fights the overlay's tap-to-skip gesture.
 */
export function RealMap({ lat, lng, zoom, markerLabel }: { lat: number; lng: number; zoom: number; markerLabel?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    injectDarkMapStyles();
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom,
      zoomControl: false,
      attributionControl: true,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      fadeAnimation: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
    }).addTo(map);

    const icon = L.divIcon({
      className: "",
      html:
        '<div style="width:16px;height:16px;border-radius:9999px;background:#e8748f;box-shadow:0 0 20px 8px rgba(232,116,143,0.85);border:2px solid #faf3ea;"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
    L.marker([lat, lng], { icon, ...(markerLabel ? { title: markerLabel } : {}) }).addTo(map);

    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 60);

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="olu-dark-map absolute inset-0" />;
}
