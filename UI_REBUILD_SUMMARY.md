# UI Rebuild Summary

## Design Concept: "The Processing Layer"

**Metaphor:** Signal in. System out.
Raw manual work enters a processing layer and exits as clean, deterministic output.
Like a circuit trace. Like a signal processor. Like a state machine.

**Why this metaphor works for automateable:**
The product converts chaos into controlled systems. The visual language should feel
like the operating layer that does that conversion: precise, technical, alive, and functional.

**What changed from the previous UI:**
- From: generic dark SaaS with blue-cyan gradients and glowing orbs
- To: precise operating layer with circuit trace metaphors, monospaced data elements,
  staged pipeline animations, and editorial typography

---

## Design System

### Colors
- Surface hierarchy: `#07070a` (base) through `#1c1c22` (elevated)
- Brand: `#2563eb` (precise blue, not the generic `#3b82f6`)
- Status: amber `#f59e0b` (live/active only), green `#16a34a` (success), red `#dc2626` (error)
- Text: 4-level scale from `#f0f0f2` (high) to `#32323e` (disabled/decorative)

### Typography
- Display: Inter 900 weight, -0.055em tracking, 0.97 line-height (editorial, massive)
- Data/metrics: JetBrains Mono throughout all numbers, codes, status indicators
- Body: Inter 400, 1.7 line-height (comfortable and readable)
- Labels: Inter 600, 0.1em tracking, uppercase (used sparingly)

### Motion
- Entrance: opacity + translateY(10px), 220ms, cubic-bezier(0.22,1,0.36,1)
- Stagger: 60ms between items (disciplined, not circus)
- Hover: border-color transition 150ms (no translateY on hover)
- Signature: SMIL SVG path draws with staged node reveals (PipelineTrace)
- Reduced motion: all animations collapse via @media(prefers-reduced-motion:reduce)

---

## Files Changed

### New files
- `src/components/PipelineTrace.tsx` - Signature animated SVG pipeline diagram
- `UI_REBUILD_PLAN.md` - Full diagnosis, design decisions, implementation checklist
- `.claude/skills/premium-ui-auditor.md`
- `.claude/skills/product-world-builder.md`
- `.claude/skills/motion-performance-reviewer.md`
- `.claude/skills/visual-regression-reviewer.md`

### Rebuilt files
- `src/styles/tokens.css` - New color system, type scale, motion tokens
- `src/styles/global.css` - New utility classes, typography scale, animation keyframes
- `src/sections/Navbar.tsx` - Minimal precise nav, animated mobile drawer
- `src/pages/HomePage.tsx` - Kinetic hero with PipelineTrace, numbered services list
- `src/pages/ServicesPage.tsx` - Numbered accordion (6 services, expand/collapse)
- `src/pages/AuditPage.tsx` - Process timeline + terminal-style report preview
- `src/pages/PricingPage.tsx` - Top-accent cards, monospace pricing display
- `src/pages/AboutPage.tsx` - Editorial layout with manifesto pull-quote
- `src/pages/UseCasesPage.tsx` - Persona tabs with before/after diff view

---

## Components Built

| Component | Description |
|---|---|
| PipelineTrace | SVG with SMIL animations: path draws, staged node reveals, metric chips |
| TerminalPreview | Monospace-styled audit output in AuditPage |
| NumberedAccordion | Services list with expand/collapse state in ServicesPage |
| ProcessTimeline | Vertical numbered steps with connector line in AuditPage |
| DiffView | Before/after problem/automation comparison in UseCasesPage |
| ManifestoBlock | Left-bordered pull-quote in AboutPage |

---

## Motion Added

1. **PipelineTrace (HomePage hero)** - Signature moment
   - 6-stage SMIL path draw sequence (1.6s total)
   - Nodes appear staged (opacity transitions with delay)
   - Metric chips fade in after pipeline completes
   - "System online" indicator appears at end
   - React useEffect drives step-by-step state

2. **Hero entrance choreography**
   - Chip: 0ms delay
   - H1: 60ms delay
   - Paragraph: 140ms delay
   - CTAs: 220ms delay
   - Principles: 350ms delay
   - Pipeline panel: 100ms delay, x:20px slide

3. **Page transitions** (Framer Motion AnimatePresence)
   - opacity + y:12px, 350ms per route

4. **Scroll reveals** (Reveal/Stagger/SI components)
   - 10px distance (down from 20px - more refined)
   - 60ms stagger between siblings

5. **Interactive states**
   - Services list: `whileHover={{ x: 4 }}` slide-right (15ms)
   - Pricing cards: `whileHover={{ y: -2 }}` subtle lift
   - Accordion chevrons: rotation animation via `animate={{ rotate }}`

---

## Accessibility / Performance

- All animations respect `prefers-reduced-motion`
- Focus states: 2px blue outline on all interactive elements
- Semantic HTML: nav with aria-label, buttons with aria-expanded, h1-h6 hierarchy
- Lazy loading: all pages via React.lazy + Suspense
- No layout-triggering animations (transform/opacity only)
- PipelineTrace uses SMIL for SVG animations (no JS on every frame)

---

## Known Limitations

- Blog/Resources pages not redesigned in this pass (structure is fine, not the priority)
- ToolsPage not redesigned (filter + expand works, visually acceptable)
- ContactPage not redesigned (form logic is solid, left unchanged)
- No Three.js / WebGL added (CSS/SVG approach is appropriate and performant)
- Footer is functional but minimal (intentional - not a page people stop at)

---

## Commands Runnpm run lint    # LINT OK - zero errors, zero warnings
npm run build   # BUILD OK - zero TS errors
# Server running at http://localhost:5173/

## Verification
- All 11 routes respond HTTP 200
- npm run lint: PASS (0 errors)
- npm run build: PASS (0 TS errors)
- Git commit: 09d663a
