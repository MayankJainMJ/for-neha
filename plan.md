# Neha's Proposal Site — Vision & Architecture

## The Vision
A cinematic, interactive, deeply personal proposal website for Neha — built to make her laugh, cry, and say YES. Every element tells the story of 8 years of friendship, missed chances, and finally finding each other.

---

## The Story Behind It
- **Mayank & Neha** have known each other for **8+ years**, since Endeavour (MBA coaching)
- They liked each other but never said it — took different paths, different cities
- Stayed connected as friends through calls, supported each other through heartbreaks
- When Neha planned to move to **Canada**, Mayank flew to **Bangalore** to see her one last time — stayed 4 days, didn't confess, and let her go
- Neha came back to India — Mayank couldn't resist, they met in **Delhi on Sept 30, 2025**
- She picked him up at the station, they held hands in the auto, went to CP
- He asked to kiss her — **that kiss sealed everything**
- They confessed feelings, talked about marriage, and are now together
- Currently **long distance** (India ↔ Canada), planning a **Japan trip** to meet again

---

## Site Flow (6 pages)

### 1. `index.html` — Audio Dare Page (Landing)
- **Cinematic entrance**: Dark overlay → "Hey Neha..." types in → "I have something for you..." → dissolves
- **Star particle canvas** background
- **Audio player**: Mayank's voice message (message.opus) — "I dare you to say No after hearing this 😏🎵"
- **Continue button** appears after 3 seconds of listening
- Floating hearts, smirk emoji
- → Links to `proposal.html`

### 2. `proposal.html` — The Proposal (YES/NO)
- "Will you be my wifey? 💕" with Neha's photo (glowing pulsing ring)
- **YES button**: Green, sparkle particles on hover, links to celebration
- **NO button**: Red/visible, dodges on hover with quirky messages for 10 seconds
  - Chase commentary bubbles pop up ("Haha you thought! 😂", "That button has trust issues! 😂")
  - Chase counter at bottom ("Girl, 5 attempts?! Just say YES! 😂")
  - Screen shake after 5 attempts, YES button grows bigger
  - After 10 seconds: NO stops dodging → "Fine, click No 😢" → clickable → goes to areyousure
- → YES: `celebration.html` | NO (after 10s): `areyousure.html`

### 3. `areyousure.html` — Maximum Guilt Trip
- Sad blue/purple gradient, wobbling 🥺 emoji
- **Countdown timer** from 10 → 0
- 6 initial YES buttons with personal messages ("YES because he flew to Bangalore for you! ✈️")
- When countdown hits 0: **12 more YES buttons flood in** one by one (200ms stagger)
  - "Remember CP? That kiss? YES! 💋"
  - "Japan trip is waiting! YES! 🇯🇵"
  - "Your future wifey title is waiting! YES! 💍"
  - "He made a whole website for you! YES! 🫠"
- NO button disappears completely, screen shakes on dodge
- All buttons → `celebration.html`

### 4. `celebration.html` — The Grand Finale (Hub Page)
- Flash entrance (white → pink → dissolve with heart burst)
- **"She said YES!"** heading with confetti, fireworks, falling hearts
- **Audio player**: celebration.opus (second voice message)
- **Photo slideshow**: 6 curated photos with auto-rotate
- **Typewriter love message**: Types out letter character by character
- **Three link buttons** to sub-pages:
  - "Read Our Story 💕" → `ourstory.html`
  - "See All Photos 📸" → `gallery.html`
  - "Our Future Together 🌏" → `ourfuture.html`
- **YouTube embed**: "Dooron Dooron" by Paresh Pahuja
- **Finale**: "My wifey 💕" (glowing) → "Forever & always" (shimmer gradient) → "Made with all my love, for you, Neha"
- Background: Confetti canvas, firework bursts every 4-8s, sparkle particles, falling hearts

### 5. `ourstory.html` — The Full Love Story
- Dark glass card with the complete 8-year narrative
- Sections: Endeavour days → Different paths → Canada → Bangalore visit → Letting go → Coming back → Delhi Station → CP → The Kiss → The Confession → Long distance → Japan plans → Declaration
- **Key dramatic moments** as centered bold text:
  - "Eight years. And I never stopped thinking about you."
  - "And I let you go."
  - "But then you came back."
  - "So I braved it. I asked if I could kiss you."
  - "I love you. More than words on a screen could ever say."
- Photo of them together at CP (our-story.jpg)
- Pink highlighted words for emotional emphasis
- ← Back button to celebration

### 6. `gallery.html` — Photo Gallery (74 Photos)
- "Every version of you, I fell for 💕"
- "The different Nehas I've seen, stored in my heart and in my phone. The goofy one, the pretty one, the sleepy one, the dramatic one — I loved each one of you."
- Responsive grid (4 cols desktop, 2 cols mobile)
- Scroll-reveal animation (staggered fade-in via IntersectionObserver)
- Hover effects: zoom, glow border
- ← Back button to celebration

### 7. `ourfuture.html` — Our Future Together
- Two caricature sections:
  1. **Globe caricature** (caricature.jpg): Them on top of the world, flight paths from India & Canada converging on Japan
     - "One flying from India. One flying from Canada. Both landing in Japan."
     - "Because no distance is too far when it's you at the other end."
  2. **Onsen & Lakeside caricature** (caricature-onsen.jpg): Japan activities
     - "Hot springs. Lakeside sunsets. Cherry blossoms. And you next to me through all of it."
     - "I can't wait to make these memories real. 🌸"
- ← Back button to celebration

---

## Technical Architecture

### Files
```
proposal/
├── index.html          # Audio dare landing page
├── proposal.html       # YES/NO proposal page
├── areyousure.html     # Guilt trip page
├── celebration.html    # Main celebration hub
├── ourstory.html       # Full love story
├── gallery.html        # Photo gallery (74 photos)
├── ourfuture.html      # Future caricatures
├── css/
│   └── style.css       # All styles (Playfair Display + Montserrat fonts)
├── js/
│   ├── bgmusic.js      # Floating background music button (all pages)
│   ├── particles.js    # Star/shimmer particle canvas (index, proposal)
│   ├── dodge.js        # NO button dodge logic + screen shake
│   ├── confetti.js     # Confetti canvas (celebration)
│   ├── celebration.js  # Slideshow, typewriter, audio, fireworks, sparkles
│   └── gallery.js      # IntersectionObserver scroll-reveal
├── audio/
│   ├── message.opus    # Voice message for dare page
│   └── celebration.opus # Voice message for celebration page
└── images/
    ├── hero.jpg        # Main photo for proposal page
    ├── photo1-6.jpg    # Slideshow photos
    ├── our-story.jpg   # Photo together at CP Delhi (compressed: 150KB)
    ├── caricature.jpg  # Globe caricature (compressed: 190KB)
    ├── caricature-onsen.jpg # Onsen caricature (compressed: 301KB)
    └── photos_extracted/ # 74 gallery photos
```

### Design System
- **Fonts**: Playfair Display (headings, story text — elegant serif) + Montserrat (body, buttons — clean sans-serif)
- **Colors**: Pink/purple/orange gradient backgrounds, glass-morphism cards, pink highlights (#ff6b9d)
- **Effects**: Floating hearts, confetti, firework bursts, star particles, screen shake, sparkle explosions
- **Responsive**: Works on mobile (375px) and desktop
- **Performance**: Images compressed (89% savings), lazy loading, gallery on separate page

### Hosting
- **GitHub Pages**: https://mayankjainmj.github.io/for-neha/
- Repo: https://github.com/MayankJainMJ/for-neha (public)
- Push to deploy: `git add -A && git commit -m "message" && git push`

---

## Key Features
- [x] Cinematic entrance with typewriter text
- [x] Audio dare page (voice message before proposal)
- [x] Dodging NO button with chase commentary
- [x] NO clickable after 10 seconds → guilt trip page
- [x] Countdown timer with flood of YES buttons
- [x] Screen shake on NO hover
- [x] Growing YES button size
- [x] Confetti + fireworks on celebration
- [x] Photo slideshow with auto-rotate
- [x] Typewriter love message
- [x] Full 8-year love story with dramatic formatting
- [x] 74-photo gallery with scroll-reveal
- [x] Custom caricatures (globe + onsen)
- [x] YouTube song embed (Dooron Dooron)
- [x] Audio players for voice messages
- [x] Floating background music button (all pages)
- [x] "My wifey" glowing finale
- [x] "Forever & always" shimmer text
- [x] Mobile responsive
- [x] Deployed on GitHub Pages

## Pending
- [ ] Background music file (Tum Hi Ho instrumental) — needs `audio/bgmusic.mp3`
- [ ] Audio-file-2 for celebration page (currently using celebration.opus)
