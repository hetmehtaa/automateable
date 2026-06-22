# Experience Rebuild Plan: The Automation Foundry

## Current UI Problems
- Pitch-black dark theme feels like every SaaS since 2021
- Standard top navbar = unmemorable
- fade-up-on-scroll is the only motion pattern
- Hero is just headline + bullets + SVG widget
- Pages are structurally identical (eyebrow + h1 + p + CTA)
- No spatial narrative, no scroll choreography
- Cards are interchangeable - nothing feels specific to this product

## New Creative Concept: "The Automation Foundry"
The website IS the automation engine. Visitor experiences the transformation:
Chaos Input â Workflow Map â Blueprint â Build â Verify â Scale

## Theme: Warm Light
- bg: #faf8f5 (warm off-white, like grid paper)
- ink: #1a1410 (warm near-black, not cold grey)
- accent: #1d4ed8 (deep electric blue), #15803d (signal green), #d97706 (amber)
- Dark sections used for contrast only (not entire site)

## Navigation Architecture
- Left "Automation Rail" (56px, fixed) showing 6 stages
- Minimal TopBar (52px) with logo + command palette trigger + contextual CTA
- CommandPalette (âK) for full nav
- Mobile: rail hidden, compact command launcher in topbar

## Automation Rail Stages (map to pages + scroll position)
01 INPUT  â Contact, Homepage hero
02 MAP    â Audit page
03 DESIGN â Services page
04 BUILD  â AI Tools, Use Cases
05 VERIFY â Pricing
06 SCALE  â About, Blog

## Homepage Scroll Story (GSAP ScrollTrigger)
1. Hero: Problem Intake Console - messy problems float/jitter
2. Pin 1: Cards pulled into workflow scanner
3. Pin 2: Nodes form with connecting lines
4. Pin 3: Blueprint architecture appears
5. Pin 4: Agents assemble, ROI counter increments
6. Release: Clean system dashboard view

## Design System
- Font: Inter (display, 900wt, -0.05em) + JetBrains Mono (data, metrics)
- Warm surfaces: 5-level scale from #faf8f5 â #e8e4de
- Blueprint grid: subtle dot pattern on hero backgrounds
- Tactile details: measurement labels, system logs, scan lines

## Packages Added
- gsap + @gsap/react (scroll choreography)
- @studio-freight/lenis (smooth scroll)
- cmdk (command palette)
- lucide-react (consistent icons)
- clsx (className utility)

## Implementation Checklist
- [x] Install packages
- [ ] tokens.css (warm light theme)
- [ ] global.css (new utilities)
- [ ] AppShell (layout shell)
- [ ] AutomationRail (left nav)
- [ ] TopBar (minimal top)
- [ ] CommandPalette (cmdk)
- [ ] Footer (updated)
- [ ] App.tsx (use AppShell)
- [ ] HomePage (scroll story)
- [ ] ServicesPage (module board)
- [ ] AuditPage (audit simulator)
- [ ] PricingPage (system builder)
- [ ] UseCasesPage (before/system/after)
- [ ] AboutPage (principles)
- [ ] All pages: light theme adaptation
- [ ] Build + lint passes
