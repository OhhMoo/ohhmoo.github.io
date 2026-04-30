# Behaviors — georgialyu.com

## Scroll-driven

- **Nav hide/reveal** — script.js: `scroll > lastY && y > 80` → `nav--hidden` (translateY(-100%)). Transition `transform 0.3s var(--ease)`.
- **Grid hint fades** — `.grid-hint` opacity 1→0 at scrollY > 120. Inversely, `.grid-col-ext` opacity 0→1 + `.active` class added (which animates the bubble in).
- **Fade-in reveal** — IntersectionObserver, threshold 0.12, rootMargin `0px 0px -40px 0px`. All `.fade-in` elements: opacity 0→1, translateY(20px)→0, transition 0.7s `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Project cards stagger by 0.08s each (1st 0s, 2nd 0.08s, 3rd 0.16s, 4th 0.24s).
- **Anchor smooth scroll** — `a[href^="#"]` clicks: `window.scrollTo({ top: target - navH, behavior: 'smooth' })`.

## Click-driven

- **Black cell open/close** — toggling `.open` class. On open, plays `doorOpen` keyframe (`perspective(300px) rotateY(0→-82deg)`, 0.5s). On close, `doorClose` (reverse). Bubble fades in 0.46s after, then auto-hides 3s after open by setting opacity:0 and transform.
- **Center cell** — always starts with `.open` class on grid load.
- **Mobile menu** (`.nav-menu-btn`) — toggles `.nav-center` display, populates absolute positioning + dropdown styles inline.

## Hover-driven

- **Project card hover** — `mouseenter`: video.play(); on canplay, add `.video-ready` (image opacity 0, video opacity 1). `mouseleave`: pause, reset, remove class.
- **Project image scale** — `.project-card:hover .project-img` → `transform: scale(1.04)`, transition 0.55s ease.
- **Nav link hover** — color `var(--text-2)` → `var(--text)`, 0.2s.
- **Nav icon hover** — color `var(--text-3)` → `var(--text)`, 0.2s.
- **Nav logo hover** — color → `var(--accent)` (#C4593A), 0.2s.

## Time-driven

- **Bubble auto-hide** — 3s after a cell opens, the bubble is hidden (opacity 0, transform scale(0.88) translateY(3px)) via inline style. Door stays open (no auto-close).

## Responsive breakpoint

Single breakpoint at **768px**. Below 768px:
- Cells 64px instead of 104px
- Grid layout flips: 5×9 (instead of 9×5), grid--row 5×1 (instead of 9×1)
- Hero stacks vertical
- Nav: hides nav-center & nav-icons, shows hamburger
- Projects: 1-column

JS `getLayout()` uses 600px threshold (cols=5 if <=600). CSS uses 768px.

## Smooth scroll

`html { scroll-behavior: smooth }` only. No Lenis or JS smooth-scroll library.
