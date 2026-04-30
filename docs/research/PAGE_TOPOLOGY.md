# Page Topology — georgialyu.com

Single-page portfolio site. Sections in document order:

1. **NAV** (`<nav class="nav">`) — fixed, height 56px (48px mobile), backdrop-filter blur(16px), bg `rgba(249,249,249,0.6)`, z-index 200. Three columns: logo (left), nav links (center), social icons (right). Hides on scroll-down past 80px, reveals on scroll-up.

2. **HERO** (`<section class="hero">`) — min-height 100vh, flex centered, padding `calc(56px + 5rem) max(3rem, calc((100% - 1296px)/2)) calc(5rem + 312px)`. Contains:
   - `.hero-bg-circle` — 55vw radial gradient circle, top 8%, right -8%, accent rgba(196,89,58,0.07)
   - `.hero-right` — flex column, contains `.grid-wrap` and `.grid-hint`
     - `.grid-wrap` — relative, contains:
       - `.grid#grid` — 9×5 grid of 104px cells (5×9 on mobile <=768px). Built by JS (`grid-demo.js`).
       - `.grid-col-ext.grid-col-ext--bottom` — absolute below grid, holds `.grid-col-ext-char` with `extra-1.png` + bubble "👀 Take a glimpse..."
     - `.grid-hint` — "Click the dark cells" label, fades out after scroll>120

3. **SCROLL ARROW** (`.scroll-arrow`) — between hero and work, downward chevron SVG, color rgba(0,0,0,0.25)

4. **WORK** (`<section id="work" class="work">`) — padding `6rem max(3rem, calc((100% - 936px)/2))`. Contains:
   - `.section-header` with `PROJECTS` label
   - `.projects` — 2-column grid (1-col mobile), gap 2rem, 4 project cards
   - `.section-header` with `SEE MORE WORK →` link (to `art.html`)

5. **GRID-ROW-SECTION** (`<section class="grid-row-section">`) — 1-row 9-cell grid (5-cell mobile). Padding `calc(4rem + 208px) max(3rem, calc((100% - 936px)/2)) 4rem`. Contains:
   - `.grid#grid2` — 9×1 (5×1 mobile)
   - `.grid-col-ext.grid-col-ext--top` — absolute above grid, holds `extra-buttom1.png` + bubble "Have any advice? Find me on Linkedin!"

6. **FOOT** (`<section id="foot" class="foot">`) — height 56px, margin-top 4rem, padding-bottom 2rem. Centered Work / Art / About links.

## Z-index layers
- Nav: 200
- `.cell-num`: 3
- `.cell-fill`: 3
- `.bubble`: 4
- `.cell-img`: 0

## Page width
Body bg: `#ffffff`. Max content width 1296px (nav) / 936px (work). All padding uses `max(3rem, calc((100% - WIDTH)/2))` for centered max-width.
