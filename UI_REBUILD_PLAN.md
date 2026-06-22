# UI Rebuild Plan â automateable

## 1. Current UI Diagnosis

### What works
- Dark #0a0a0b base is correct for the product category
- 11-page structure with React Router is architecturally sound
- Framer Motion is already in the stack
- Token system exists with good naming
- Copy is direct and non-generic ("send the messy version")

### What is weak / generic / broken

**Visual identity: none**
- No signature visual concept. Just dark + blue-cyan which is every SaaS since 2021
- The hero SVG workflow graph is technically decent but visually small, cramped, and unimpressive
- No memorable moment anywhere on the site
- "Automation consulting" could be any 50 sites

**Typography: flat**
- Everything uses Inter 700-900. No contrast between hierarchy levels.
- No editorial boldness. h1s feel the same as h2s at a glance
- Mono font (JetBrains Mono) is declared but barely used despite being perfect for this product
- Letter-spacing and tracking inconsistent across pages

**Layout: template-looking**
- Every page header: .label + h1 + p + button. Zero variation
- Grid layouts are predictable 3-col / 2-col throughout
- No negative space used as a design tool
- Services page = list. Audit page = list. Pricing = 3 cards. Nothing memorable.

**Components: not a system**
- 80% of styling is inline style objects scattered inside JSX
- .card, .btn, .chip CSS classes exist but pages bypass them constantly
- No real component abstraction - each page rebuilds its own atoms
- Button hover states exist but are inconsistent (some translateY, some background only)

**Motion: functional but tasteless**
- Framer Motion Reveal/Stagger used correctly but purely as scroll-fade-up
- No personality, no choreography, no signature feel
- The SMIL SVG animations in hero are the most interesting motion on the site
- No entrance choreography that creates sequence and hierarchy

**Information density: wrong in both directions**
- Hero is underdense (too much empty space with too little happening)
- Services page is overdense (walls of text, no visual breathing)
- Pricing page cards need better information hierarchy

**Signature moment: zero**
- Nothing on this site makes you stop and pay attention
- No "wow" moment that creates brand recall
- The product category demands something that feels like a live operating layer

**Mobile: untested**
- Inline grid styles with media queries in <style> tags inside components
- Some grids break without className overrides
- Nav hamburger works but mobile layout needs testing

---

## 2. Product Interpretation

**What this product actually is:**
An automation engineering firm that takes chaotic manual workflows and converts them into deterministic, repeatable systems.

**The right metaphor:**
Not "AI magic" â that is the slop to avoid.
The right metaphor: **Signal routing and circuit design**.

Raw noise (manual work, scattered tools, human error) enters a processing layer and exits as clean, structured output. Like a signal processor. Like a PCB trace. Like a state machine.

**Visual language:**
- Thin ruled lines creating information layers (like a schematic or terminal)
- Monospaced numbers, codes, and status outputs â technical credibility
- Real-time indicators: status dots, progress fills, elapsed time
- Pipeline traces as the decorative grammar (not blobs, not orbs)
- Precise grid â everything aligned to an invisible 8px grid
- Typography contrast: ultra-bold display vs ultra-light body creates signal/noise distinction

**What the user should feel:**
"This is how serious engineers think about my chaos. This is not a template shop."

---

## 3. Visual Concept: "The Processing Layer"

**One metaphor:** Raw input â Processing layer â Clean output
**One color:** Near-black + single precise blue (#2563eb, not the generic #3b82f6) + white
**One accent:** Amber (#f59e0b) for status/live indicators only â not decoration
**One typography move:** 
  - Display: Inter 900, -0.05em tracking, 1.0 line-height (massive, editorial)
  - Body: Inter 400, comfortable
  - Data/code: JetBrains Mono everywhere there is a number, metric, or status
  - Label: Inter 500, 0.1em tracking, uppercase â but used sparingly
**One motion language:**
  - Fast (150ms) micro-interactions on hover
  - Staggered entrance: elements enter in reading order, not all at once
  - The signature animation: a pipeline trace that draws itself on page load (CSS stroke-dashoffset)
  - Reduced motion: all animations collapse to instant opacity change

**Signature moment:** The HomePage hero features a kinetic "processing layer" visualization â a real-time diagram showing a workflow entering the system, being processed, and outputting structured data. Not a fake dashboard. An actual metaphor for the product.

---

## 4. Design System Decisions

### ColorsPrimary surface:   #0a0a0b (near-black, not pure black)
Layer 1:           #0f0f11 (card backgrounds)
Layer 2:           #141417 (elevated)
Layer 3:           #1a1a1f (highest elevation)
Border default:    rgba(255,255,255,0.06)
Border hover:      rgba(255,255,255,0.10)
Border active:     rgba(255,255,255,0.16)

Text primary:      #f0f0f2 (not pure white, slightly warm)
Text secondary:    #8c8c9a
Text tertiary:     #4a4a58
Text disabled:     #2e2e38

Brand blue:        #2563eb (precise, not generic)
Blue hover:        #1d4ed8
Blue subtle:       rgba(37,99,235,0.10)
Blue border:       rgba(37,99,235,0.20)

Amber (live only): #f59e0b
Amber subtle:      rgba(245,158,11,0.10)

Green (success):   #16a34a
Red (error):       #dc2626

### Typography scale
--display-2xl: clamp(4rem, 8vw, 7rem) / weight 900 / tracking -0.05em / lh 0.95
--display-xl:  clamp(2.5rem, 5vw, 4.5rem) / weight 900 / tracking -0.04em / lh 1.0
--display-lg:  clamp(2rem, 3.5vw, 3rem) / weight 800 / tracking -0.03em / lh 1.05
--display-md:  clamp(1.5rem, 2.5vw, 2rem) / weight 700 / tracking -0.02em
--body-lg:     1.0625rem / weight 400 / lh 1.7
--body-md:     0.9375rem / weight 400 / lh 1.65
--body-sm:     0.8125rem / weight 400 / lh 1.6
--label:       0.6875rem / weight 600 / tracking 0.1em / uppercase
--mono-md:     0.875rem / JetBrains Mono / weight 500
--mono-sm:     0.75rem / JetBrains Mono / weight 500

### Spacing rhythm
Base unit: 4px. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128

### Elevation/depth
No box-shadow as decoration. Use only:
- Border color change for hover state
- Background lightening for active/pressed
- Actual drop-shadow only for floating elements (menus, tooltips)

### Motion tokens
--ease-out:     cubic-bezier(0.22, 1, 0.36, 1)
--ease-in:      cubic-bezier(0.55, 0, 0.78, 0)
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1)
--dur-instant:  80ms
--dur-fast:     150ms
--dur-base:     220ms
--dur-slow:     400ms
--dur-crawl:    700ms

---

## 5. Route-by-Route Changes

### / (HomePage)
- REMOVE: current FlowSVG (too small, too cluttered)
- ADD: Full-width kinetic hero with the "processing layer" pipeline
- REMOVE: Ticker strip (generic SaaS)
- REWORK: Value props row into sparse horizontal stat bar
- REWORK: Services preview as numbered list with hover reveals, not cards
- KEEP: CTA strip Ã¢ but tighten it dramatically
- Signature animation: pipeline trace draws on load

### /services
- REWORK: Page header into a bold editorial block
- REWORK: Service list from wall-of-text cards into a numbered accordion with expand states
- Each service = one strong line + expandable detail
- ADD: Right-side persistent "start with an audit" contextual CTA

### /tools
- REWORK: Filter bar tighter and more intentional
- REWORK: Tool cards into a denser data table / list hybrid
- ADD: Status column (live/beta/soon) as first-class visual
- REMOVE: Current expandable drawer Ã¢ replace with hover-reveal sidebar

### /audit
- REWORK: This is the highest-value conversion page. Needs to feel like a product spec.
- ADD: Visual timeline of the audit process (5 steps)
- REWORK: Sample report preview into a more realistic terminal-style output
- KEEP: FAQ accordion Ã¢ clean it up

### /use-cases
- REWORK: Tab navigation into left-sidebar nav (more product-like)
- REWORK: Before/after from colored boxes into a side-by-side diff view

### /pricing
- REWORK: Three cards into a comparison table for the feature list + card header for price/tier
- ADD: "Why start with the audit" rationale block

### /about
- REWORK: Two-column into editorial single-column with large pull quotes
- ADD: One strong manifesto paragraph

### /contact
- KEEP: Form structure Ã¢ it is good
- REWORK: Left column from bullet list into a single strong statement
- ADD: Expected response time indicator

### /blog, /blog/:slug
- REWORK: Post cards into a clean editorial list (title, date, read time, category tag)
- REWORK: Article page typography Ã¢ wider measure, better prose spacing

### /resources
- REWORK: Featured grid into a simpler 2-column list with type indicators

---

## 6. Component Changes

### New/rebuilt components needed:
1. PipelineTrace Ã¢ the signature animated SVG hero element
2. ProcessTimeline Ã¢ vertical numbered sequence with connector lines
3. StatBar Ã¢ sparse horizontal statistics strip
4. NumberedAccordion Ã¢ expandable numbered list for services
5. DataTable Ã¢ for tools page
6. DiffView Ã¢ before/after comparison
7. ManifestoBlock Ã¢ large editorial text block
8. TerminalPreview Ã¢ monospace styled content block

### Global component fixes:
- Standardize all buttons to use .btn classes Ã¢ remove inline button styles
- Create .surface-1/2/3 utility instead of writing background colors inline
- Fix all inline grid definitions Ã¢ move to CSS classes
- Consolidate the six different ways cards are currently built

---

## 7. Motion Plan

### Signature: Pipeline Trace (HomePage)
- SVG path that draws from left to right on page load
- Staggered node appearances (opacity 0Ã¢1 with slight upward movement)
- Duration: 1.8s total choreography
- Reduced motion: immediate reveal of final state

### Page transitions
- Current: basic opacity/translateY fade - KEEP but tighten timing
- Add: slight horizontal slide (8px) to reinforce left-to-right navigation

### Hover interactions
- Cards: border-color transition only (150ms) Ã¢ no translateY
- Links: color transition + subtle underline growth
- Buttons: background shift + very slight scale (1.0 Ã¢ 1.01) on primary buttons

### Scroll reveals
- Keep Reveal/Stagger components
- Reduce distance from 20px to 12px (less dramatic, more refined)
- Stagger delay: 60ms (current 70ms Ã¢ fine)

### Micro-interactions
- Status dots: existing pulse animation is correct Ã¢ keep
- Form focus: border-color + subtle background shift
- Accordion: height animation with opacity crossfade (currently height-only)

---

## 8. Implementation Checklist

- [ ] Rebuild tokens.css with refined palette
- [ ] Rebuild global.css with new type scale + utility classes
- [ ] Build PipelineTrace SVG component
- [ ] Rebuild HomePage hero with PipelineTrace
- [ ] Rebuild HomePage (remove ticker, rework props, rework services)
- [ ] Rebuild Navbar (tighten spacing, improve active states)
- [ ] Rebuild ServicesPage (numbered accordion)
- [ ] Rebuild ToolsPage (data-dense list)
- [ ] Rebuild AuditPage (process timeline + terminal preview)
- [ ] Rebuild PricingPage (comparison table hybrid)
- [ ] Rebuild ContactPage (tighten left column)
- [ ] Rebuild AboutPage (editorial single-column)
- [ ] Rebuild UseCasesPage (left-sidebar nav)
- [ ] Rebuild BlogPage + BlogPostPage (editorial typography)
- [ ] Create .claude/skills files
- [ ] npm run build Ã¢ verify zero errors
- [ ] npm run lint Ã¢ verify zero errors
- [ ] Launch and visual inspection
- [ ] Write UI_REBUILD_SUMMARY.md

---

## 9. Verification Checklist

- [ ] No TypeScript errors
- [ ] No console errors
- [ ] All 11 routes load
- [ ] Contact form validates and shows success state
- [ ] FAQ accordions expand/collapse
- [ ] Nav hamburger works on mobile
- [ ] Reduced motion respected
- [ ] No broken imports
- [ ] Build passes
