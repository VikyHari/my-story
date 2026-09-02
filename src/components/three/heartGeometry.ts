import * as THREE from "three";

/** Builds a proper heart-shaped 2D curve, used for the extruded 3D heart mesh. */
export function createHeartShape(scale = 1): THREE.Shape {
  const shape = new THREE.Shape();
  const x = 0;
  const y = 0;
  shape.moveTo(x, y + 0.5 * scale);
  shape.bezierCurveTo(x, y + 0.5 * scale, x - 0.6 * scale, y, x - 1 * scale, y + 0.35 * scale);
  shape.bezierCurveTo(x - 1.6 * scale, y + 0.9 * scale, x - 0.9 * scale, y + 1.5 * scale, x, y + 1.9 * scale);
  shape.bezierCurveTo(x + 0.9 * scale, y + 1.5 * scale, x + 1.6 * scale, y + 0.9 * scale, x + 1 * scale, y + 0.35 * scale);
  shape.bezierCurveTo(x + 0.6 * scale, y, x, y + 0.5 * scale, x, y + 0.5 * scale);
  return shape;
}

export function createHeartGeometry(scale = 1, depth = 0.5): THREE.ExtrudeGeometry {
  const shape = createHeartShape(scale);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.12,
    bevelSize: 0.1,
    bevelSegments: 6,
    curveSegments: 24,
  });
  geometry.center();
  geometry.rotateZ(Math.PI);
  return geometry;
}
