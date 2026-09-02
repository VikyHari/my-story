# Our Little Universe ❤️

A premium, interactive 3D love-story website built as a personal gift — a sequence of cinematic chapters (not a giant scrolling page) that takes someone through memories, questions, an apology, a love letter, mini-games, and a proposal-style finale.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion + Three.js (React Three Fiber / drei)**.

---

## 1. Installation

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
```

## 2. Running locally

```bash
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## 3. Building for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## 4. Deployment

The project is a static site — no backend or database required.

### Vercel
1. Push this folder to a GitHub repo (or run `vercel` from the CLI).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`. (A `vercel.json` is already included for SPA routing.)

### Netlify
1. Drag-and-drop the `dist/` folder into [app.netlify.com/drop](https://app.netlify.com/drop), **or** connect the repo with build command `npm run build` and publish directory `dist`.
2. A `public/_redirects` file is already included for SPA routing.

### GitHub Pages
1. `npm run build`
2. Deploy the contents of `dist/` to the `gh-pages` branch (e.g. with the `gh-pages` npm package, or GitHub Actions).
3. If hosting under a subpath (`username.github.io/repo-name`), set `base: "/repo-name/"` in `vite.config.ts`.

---

## 5. Making it yours — everything lives in one file

You should **never need to edit a component** to personalize this site. Open:

```
src/config/loveStory.ts
```

Every name, date, question, memory, message, and message list is defined there with a typed shape (see `src/types/index.ts`). Replace every `[BRACKETED_PLACEHOLDER]` with your own words.

### Names & dates
```ts
myName: "[MY_NAME]",
herName: "[HER_NAME]",
relationshipStartDate: "2022-06-14", // YYYY-MM-DD
anniversaryDate: "2026-06-14",
herBirthday: "1999-03-21",
```

### Adding / editing memories
Edit the `memories` array. Each entry needs an `id`, `date`, `title`, `category` (one of `first-meeting`, `first-conversation`, `first-date`, `first-photo`, `funny`, `trip`, `favorite`, `difficult`, `achievement`, `recent`), `description`, and an `emoji`.

### Adding photos
1. Drop image files into `public/photos/` (create the folder if it doesn't exist).
2. In `loveStory.ts`, set each photo's `src` to `/photos/your-file.jpg` and write a short `caption`. An empty `src` shows a graceful placeholder instead of a broken image, so you can add photos gradually.

### Adding / editing questions
- `rememberQuestions` — the "Do you remember?" game (YES / NO / MAYBE, each with a custom playful response).
- `playfulQuestions` — the YES/NO game where "NO" leads to a short, funny (never blocking) escalation before landing on a positive answer.

### Apologies, reasons, letter, future plans, bucket list
All configurable as typed arrays — `apologies`, `reasonsILoveYou` (aim for 20+, it's a full constellation), `letter` (an array of paragraphs), `futurePlans`, `bucketList`, `ifWeWere`.

### The love meter's "∞" map
When the love meter first crosses into infinity, it plays a cinematic zoom-out — starting on a real map (OpenStreetMap, no API key needed) and pulling back through country, planet, solar system, and galaxy to a glowing infinity symbol. The starting map location comes from `mapLocation` in `loveStory.ts`:
```ts
mapLocation: {
  label: "Where our story began",
  lat: 13.0827,
  lng: 80.2707,
},
```
To find your own coordinates: open [openstreetmap.org](https://www.openstreetmap.org) or Google Maps, right-click the spot that means something to you two (where you met, your city, home), and copy the latitude/longitude shown.

### The 50 random love messages
`loveMessages` is a flat array of strings shown one at a time on tap. Add, remove, or rewrite freely — there's no hard minimum, though 40–50 keeps it feeling endless.

### Adding music (optional)
1. Drop audio files (mp3/ogg) into `public/music/`.
2. Add entries to `musicTracks`:
   ```ts
   musicTracks: [
     { id: "t1", title: "Our Song", artist: "Artist Name", src: "/music/our-song.mp3" },
   ],
   ```
3. Leave `musicTracks` as `[]` to gracefully hide the music player entirely — no missing-file errors, nothing broken.

Once a track is configured, it starts playing the instant the page loads — no click needed — and then keeps playing continuously in the background — looping if there's one track, or cycling through the whole list if there's more — all the way through every chapter until she leaves. It survives chapter changes and opening/closing the settings panel (it's mounted once at the top of the app, not per-screen). She can still pause it or adjust volume from the settings menu (top-left) at any time.

One unavoidable browser rule: no website can play audible sound before any interaction at all — every browser blocks that outright, there's no workaround. So the track actually starts **muted** the moment the page loads, and unmutes itself silently the instant she taps, clicks, or presses anything, anywhere on the page — it doesn't have to be a specific button. In practice that's almost always her very first tap, so it reads as "the music was already playing" rather than something starting fresh.

### Customizing colors
Open `tailwind.config.js` → `theme.extend.colors`. The palette is built around `midnight` (deep background), `wine`/`rose` (romantic accents), `blush`, `cream`, and `gold`. You can also set `favoriteColor` in `loveStory.ts`, which is available for future custom accents.

### The final message
`proposalQuestion` and `finalSignature` control the text on the final proposal screen and closing signature ("`[MY_NAME] ❤️ [HER_NAME]`").

### The closing rose
After the very last "I REALLY love you" line, a seed grows — roots, a stem, leaves, a bud, then blooms into a rose — and finishes with a two-line dedication you control:
```ts
roseDedicationTitle: "This is for you.",
roseDedicationMessage: "I will love you till the end, with my last breath, for my [PET_NAME].",
```
Edit either line freely; there's no length limit, though shorter reads better on the smallest phones.

---

## 6. How the experience is structured

The site is a sequence of full-screen **chapters**, not one long scroll (`src/state/chapters.ts` defines the order). Each chapter is its own component in `src/components/chapters/`. Progress (which chapter you're on, kiss count, love-meter value, checked bucket-list items, discovered secrets) is saved to `localStorage`, so closing the tab and coming back resumes exactly where she left off. A small heart-shaped progress indicator (top-right) shows how far through the journey she is.

A persistent Three.js scene (`src/components/three/SceneBackground.tsx`) runs behind every chapter — a starfield, a beating 3D heart, floating heart particles — and subtly changes mood ("environment") per chapter. If a device doesn't support WebGL, a hand-built CSS/canvas starfield (`FallbackBackground.tsx`) takes over automatically — nothing breaks.

### Reusable systems
- **Sound** (`src/lib/sound.ts`) — every click/pop/chime is synthesized with the Web Audio API, so sound effects work with zero audio files. Off by default; toggle in the settings menu (top-left).
- **Flying kisses** (`src/components/effects/FlyingKiss.tsx`) — call `fireKiss({ x, y })` from `src/lib/kissBus.ts` anywhere to trigger the animation.
- **Secrets** (`src/components/effects/SecretSurprise.tsx`) — `useSecret(id)` + `reveal(message)` powers every hidden interaction (long-press the intro heart, press the "L" key, triple-click a photo, tap the tiny heart bottom-left). Add more anywhere with the same hook.
- **Confetti** (`src/components/effects/Confetti.tsx`) — imperative `ref.current.burst()` used in the finale.

---

## 7. Accessibility & performance

- **Reduced motion**: toggle in settings, or it auto-detects the OS `prefers-reduced-motion` setting — animation durations shrink, particle counts drop, and transitions simplify.
- **Keyboard**: every interactive element is a real `<button>` with visible focus states.
- **Mobile-first**: no functionality depends on hover; touch targets are sized for fingers; the cursor-trail effect and magnetic buttons are desktop-only.
- **Low-end devices**: star/particle counts and renderer quality automatically scale down on mobile or reduced-motion.
- **No WebGL?** Automatic 2D fallback background, no crash, no blank screen.
- The 3D scene code is lazy-loaded (separate JS chunk) so the very first paint doesn't wait on Three.js.

## 8. Before you send it

- [ ] Replace every `[PLACEHOLDER]` in `src/config/loveStory.ts`
- [ ] Add real photos to `public/photos/` and update `photos[].src`
- [ ] (Optional) Add a song to `public/music/` and update `musicTracks`
- [ ] Run through every chapter once yourself on both desktop and a phone
- [ ] `npm run build` to confirm there are no errors, then deploy

That's it — make it yours, and good luck. ❤️
