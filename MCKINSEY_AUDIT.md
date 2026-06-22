# Full Site Audit Report
Date: 2026-06-23

## CRITICAL (ship-blocking)

### C1. Navigation not rendering
The `topbar-nav` CSS class is defined but no JSX element uses it as className.
Nav links exist in JS but the ul gets no className applied = invisible on all viewports.

### C2. Zero SEO infrastructure
- No Open Graph tags (og:title, og:description, og:image, og:url)
- No Twitter Card tags
- No canonical URL tags
- No JSON-LD structured data (Organization, WebSite, Service schemas)
- No sitemap.xml
- No robots.txt
- Meta description is generic and not per-page
- Title tags not per-page (all say "automateable")
- Font loaded via CSS @import = render-blocking

### C3. Demo content still live
- `example.com` in AuditPage terminal
- `automateable.foundry / v4.0` badge in hero = fake versioning
- `INTAKE CONSOLE` system tag looks like a prototype badge

### C4. Missing pages referenced in nav
- /personas - does not exist
- /automation-resources - does not exist

## HIGH (conversion-killing)

### H1. Copy issues
- "AI-powered execution systems" in Services (vague)
- ContactPage labels still use --t-md token references inconsistently
- ResourcesPage email placeholders are generic

### H2. Performance
- 421KB vendor bundle (React + Framer Motion + GSAP + cmdk unoptimized)
- Google Fonts via CSS @import blocks render (should be <link> preload in <head>)
- No chunk splitting in vite.config.ts
- No build compression (gzip/brotli not configured)

### H3. Security (frontend, static site)
- No Content-Security-Policy headers
- No X-Frame-Options
- No X-Content-Type-Options
- No Referrer-Policy
- No Permissions-Policy
- No _headers file for Netlify/Cloudflare/Vercel

## MEDIUM (quality/trust)

### M1. Favicon is the Vite default SVG
- icons.svg in public is the Vite icons file - unused but confusing
- favicon.svg needs to be the actual automateable logo mark

### M2. No robots.txt or sitemap.xml
- Search engines cannot crawl efficiently
- No XML sitemap for 11 pages

### M3. index.html is bare
- No theme-color meta
- No apple-touch-icon
- No og:image (needs a 1200x630 OG image)

## ACTION PLAN

1. Fix nav rendering bug
2. Remove demo junk (example.com, v4.0, intake console badge)
3. Rewrite copy on all pages (SEO-optimized, persona-specific)
4. Build /personas page (5 personas, day-in-life, problems, fixes)
5. Build /automation-resources page (curated resource library)
6. Add /personas and /automation-resources to router + nav
7. SEO: per-page meta, OG tags, JSON-LD schema, canonical
8. Performance: vite config, font preload strategy, chunk splitting
9. Security: _headers file with CSP + security headers
10. Generate robots.txt + sitemap.xml
11. Replace favicon with brand mark
12. Final build + lint + deploy check
