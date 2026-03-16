# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A cinematic, interactive proposal website for Neha — a multi-page static site with animations, audio, photo galleries, and a love story narrative. Hosted on GitHub Pages.

## Running Locally

```bash
cd /Users/mayankjain/Documents/Mayank/proposal
python3 -m http.server 8765
# Open http://localhost:8765/index.html
```

The server MUST be started from the `proposal/` directory (not the parent), otherwise paths break.

## Deploying

Hosted on GitHub Pages at https://mayankjainmj.github.io/for-neha/

```bash
git add -A && git commit -m "description" && git push
```

Repo: `MayankJainMJ/for-neha` (public). Changes deploy automatically within ~1 minute.

## Site Flow

```
index.html (audio dare) → proposal.html (YES/NO) → celebration.html (hub)
                                    ↓ (NO after 10s)
                              areyousure.html → celebration.html
                                                      ↓
                                    ┌────────────────────────────────────┐
                                    │  ourstory.html (8-year love story) │
                                    │  gallery.html (74 photos)          │
                                    │  ourfuture.html (caricatures)      │
                                    └────────────────────────────────────┘
```

All sub-pages (ourstory, gallery, ourfuture) have ← Back buttons to celebration.html.

## Architecture

**Pure static site** — no build tools, no frameworks, no bundler. Just HTML, CSS, and vanilla JS.

### Key JS Files
- `js/dodge.js` — NO button dodge logic. Dodges for 10 seconds on proposal page, then becomes clickable. Adds screen shake on areyousure page. Loaded on proposal.html and areyousure.html.
- `js/celebration.js` — Slideshow auto-rotate, typewriter effect, audio player with auto-play on first interaction, firework bursts, sparkle particles, falling hearts. Loaded on celebration.html.
- `js/particles.js` — Star/shimmer canvas particle system. Loaded on index.html and proposal.html.
- `js/confetti.js` — Confetti canvas animation. Loaded on celebration.html.
- `js/gallery.js` — IntersectionObserver for staggered scroll-reveal of gallery items and `.reveal` elements. Loaded on celebration.html and gallery.html.

### CSS
Single stylesheet `css/style.css` with all styles. Key conventions:
- **Fonts**: Playfair Display (serif, headings/story) + Montserrat (sans-serif, body/buttons)
- **Glass-morphism**: `rgba` backgrounds + `backdrop-filter: blur()`
- **Scroll-reveal**: `.reveal` class starts at `opacity: 0`, `.visible` fades in (triggered by gallery.js IntersectionObserver)
- **Gradients**: `.bg-gradient` (pink/purple), `.bg-gradient-alt` (blue/purple for areyousure), `.bg-celebration` (pink/orange)

### Audio
- `audio/message.opus` — Voice message on index.html (auto-plays on first interaction)
- `audio/celebration.opus` — Voice message on celebration.html (auto-plays on first interaction)
- Auto-play tries on page load, falls back to first click/touch anywhere via capture-phase event listeners

### Images
- Images in `images/` are compressed via `sips` (macOS). Keep files under 300KB.
- `images/photos_extracted/` contains 74 gallery photos
- Use `loading="lazy"` on images below the fold
- When adding new images with spaces in filenames, rename to use hyphens before committing

## Important Patterns

- **Audio autoplay**: Browsers block autoplay. The pattern used is: try `audio.play()` on load, add capture-phase `click`/`touchstart` listeners on `document` as fallback, remove listeners after successful play.
- **Page splitting for performance**: Heavy content (74 photos, story with images, caricatures) lives on separate pages linked from celebration.html via buttons.
- **NO button behavior**: `dodge.js` checks `isAreYouSurePage` via body class `bg-gradient-alt` to determine screen shake behavior. On proposal page, dodging stops after 10 seconds via `setTimeout`.
- **Filename spaces**: GitHub Pages breaks with spaces in filenames. Always rename files (e.g., `WhatsApp Audio...opus` → `message.opus`).

## Context

See `plan.md` for the full story context, feature checklist, and detailed page-by-page documentation.
