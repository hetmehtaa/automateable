# visual-regression-reviewer

Compare before/after states to identify regressions and weak areas.

## Review checklist per page
1. Does the headline communicate the page purpose in <3 seconds?
2. Is there a clear primary action above the fold?
3. Does the information density feel right (not sparse, not overwhelming)?
4. Are hover states visible and responsive?
5. Does the page have one moment that is memorable/distinctive?
6. Is the typography hierarchy clear at a glance?
7. Does mobile layout preserve hierarchy?

## Common regressions
- Dark backgrounds with dark text after token changes
- Grid breakpoints that collapse too early or too late
- Overflow: hidden cutting off focus outlines
- Z-index stacking broken by new position: fixed elements
- Font loading causing layout shift (use font-display: swap)
