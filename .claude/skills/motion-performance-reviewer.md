# motion-performance-reviewer

Review animation for taste, purpose, and performance.

## Performance rules
- Only animate transform and opacity (GPU composited)
- No layout-triggering animations (width, height, top, left, padding)
- Use will-change sparingly Ã¢ only on elements that animate continuously
- Framer Motion: use layout prop carefully, it triggers layout recalc

## Taste rules
- Every animation must do one of: reveal hierarchy, explain flow, show state, guide attention
- If you canÃ¢t explain why an animation exists, remove it
- Total page entrance choreography: max 1.5s
- Stagger delay: 50-80ms. More = tedious.
- Distance for reveal: 12px max. More = dramatic, less = precise.

## Reduced motion
- All animations must have fallback
- Use @media (prefers-reduced-motion: reduce) in CSS
- Framer Motion: use useReducedMotion() hook

## Red flags
- AnimatePresence with exit animations on every route transition (adds perceived lag)
- whileHover with layout animations
- Continuous animations on more than 3 elements simultaneously
- Animation delays over 800ms on any critical content
