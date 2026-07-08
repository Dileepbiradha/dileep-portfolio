# Dileep Krishna Kumar Biradha — Portfolio

A single-page, no-build portfolio: plain HTML, CSS and JavaScript, no framework or bundler required. Every 3D-style effect is built with CSS `perspective`/`transform` and vanilla JS — no Three.js, no external animation library, so it runs offline with zero dependencies beyond Google Fonts.

## Structure

```
index.html      Markup and content
styles.css      Design system + all animation/3D styles
script.js       All interaction: reveals, scrollspy, cursor, scans, etc.
assets/
  profile.png   Portrait used in the hero section
```

## Running it

Open `index.html` directly in a browser, or serve it locally:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## What's animated, section by section

- **Rail / cursor (global):** custom ring cursor with a "grow" state on hover targets, click-ripple rings on every click, a top scroll-progress bar, and a scrollspy nav that highlights the current section.
- **Hero:** a field of floating 3D keycaps (`<`, `/`, `{`, `AI`, `RAG`…) fly in from off-screen on load and drift in a slow perspective loop; the headline reveals line by line; the portrait tilts subtly.
- **About:** three columns of code fly past in the background at different speeds (pure CSS `translateY` loop, content generated in JS), masked to fade at top/bottom.
- **Skills:** a small row of keys "typing" in a continuous press loop above the skill groups.
- **Work — InventoryGPT:** a CSS-only 3D laptop whose screen rotates open when it scrolls into view, with a mini dashboard UI inside whose bar chart animates in.
- **Work — Emotion Recognition:** a live "analyzing expression" widget — a scanning line sweeps a face outline while five emotion bars (Happy, Neutral, Surprised, Sad, Angry) count up to their detected percentages, re-triggering every few seconds while in view.
- **Experience:** a growing vertical timeline with a blinking cursor after each date.
- **Contact:** a 3D mouse-and-cursor loop animating a click toward the email button.
- **Section titles, site-wide:** every heading splits into words and flips up into place (3D `rotateX`) the first time it scrolls into view.

All motion respects `prefers-reduced-motion` and disables itself for that preference.

## Live project

- **InventoryGPT demo:** https://inventorygpt-1.onrender.com/#/login — demo login `admin@test.com` / `123456` (click the credentials line on the site to copy them).

## Customizing

- **Swap the portrait:** replace `assets/profile.png`.
- **Edit copy/skills/projects:** all content lives in `index.html`, grouped by section with clear comments.
- **Adjust the emotion percentages:** edit the `data-target` attributes on the `.emo-row` elements in the Emotion Recognition project card.
- **Retune animation speed/intensity:** most timings live as CSS custom properties or `animation`/`transition` durations near the top of each section's block in `styles.css`.
