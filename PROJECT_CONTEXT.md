# PROJECT_CONTEXT.md
> Single source of truth for the Aswanth Raj portfolio. Read this before making any changes.

---

## 1. Design Direction

This is a **product lab and thinking space**, not a traditional UX portfolio.

- **Aesthetic:** Minimal, premium, editorial — Apple product page polish × Medium readability
- **Tone:** Thoughtful, confident, product-leader (not just visual designer)
- **Color:** Black & white only. Light mode = white bg / black text. Dark mode = black bg / white text. No accent colors except neutral grays for subtle UI elements and separators.
- **Feel:** The site should feel like exploring a product, not browsing a portfolio.

---

## 2. Page Structure & Sections

```
Header (sticky)
  ↓
Hero
  ↓
Featured Work  ← horizontal video carousel (scroll-hijack)
  ↓
Case Studies
  ↓
Insights       ← formerly "Notes" — renamed permanently
  ↓
Philosophy
  ↓
About
  ↓
Contact / Say Hello
  ↓
Footer
```

---

## 3. Naming Conventions

| Old Name | Correct Name | Notes |
|---|---|---|
| Notes | **Insights** | Renamed everywhere — nav, section heading, routes, MDX filenames |
| Blog | ❌ Never use | Too informal, wrong positioning |
| Portfolio | ❌ Avoid | Prefer "work", "case studies", "product thinking" |
| Design Notes | **Insights** | Header nav, footer, section titles all use "Insights" |

Route: `/insight/:slug` (not `/note/:slug`)

---

## 4. Typography

**Font:** Metropolis (primary). Fallback: `"Plus Jakarta Sans", sans-serif` for web. Inter for body text.

### Weight Rules
| Context | Weight |
|---|---|
| Hero headline | Light / Thin (200–300) |
| Section headings | Bold / ExtraBold (700–800) |
| Nav, labels | Medium (500) |
| Body / prose | Regular (400) |
| Reading pages (Case Study & Insights) | Regular 400, generous size |

### Reading Page Typography (Case Study & Insights)
Match Medium.com editorial reading experience:
- Body font size: `1.25rem` (20px)
- Line height: `1.8`
- Paragraph spacing: generous (`1.875rem` bottom margin)
- Max content width: `720px` centered
- H2 within article: `1.75rem`, weight 700
- Blockquotes: large, italic, left border accent

---

## 5. Layout Rules

- **Max content width:** `1400px`, centered with `margin: 0 auto`
- **Horizontal padding:** `clamp(1.5rem, 6vw, 5rem)` on all sections
- **Header grid alignment:** All section content must align to the same left edge as the header brand text — no orphaned margins
- **Breathing space:** Generous vertical padding `clamp(5rem, 10vw, 9rem)` between sections
- **No edge-to-edge unless intentional** (full-bleed is reserved for video cards and hero only)
- **Grid:** 2-column on desktop for Case Studies / About; single column on mobile

---

## 6. Featured Work — Video Carousel (Critical)

### Behavior
- **8 video cards** (landscape orientation, 16:9 or similar)
- **1.5 cards visible in viewport** at any time (next card always peeks ~50% to signal scrollability)
- **Scroll hijack:** Section pins to viewport; vertical scroll translates cards horizontally (GSAP ScrollTrigger `pin: true, scrub: 1`)
- Cards do NOT scroll on their own — the page scroll drives the horizontal translation

### Card Specs
- Desktop width: `clamp(400px, 52vw, 720px)`
- Aspect ratio: `16 / 9` (landscape)
- Gap between cards: `1.25rem`
- Left padding aligns with header brand text (matches page grid)

### Video Behavior
- Desktop: play on hover, pause on mouse leave
- Mobile: play when card enters viewport (IntersectionObserver, threshold 0.5)
- All videos: `muted`, `loop`, `playsInline`
- Graceful fallback: gradient background shows if video fails to load

### Alignment
- Track left padding must match the header/section content left edge
- Carousel header ("Featured Work" label + section title) must align to same grid

---

## 7. Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite 5 + TypeScript |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Animations | Framer Motion (scroll reveals, page transitions) |
| Horizontal scroll | GSAP + ScrollTrigger (`pin`, `scrub`) |
| Smooth scroll | Lenis (`@studio-freight/lenis`) — driven by GSAP ticker |
| Content | MDX via `@mdx-js/rollup` (static, no CMS in Phase 1) |
| Routing | React Router v6 |
| Deployment | Vercel (SPA rewrite via `vercel.json`) |
| Version control | Git — branches: `main` (prod), `dev` (active), feature branches |

### Critical Integration Note
Lenis must be driven by the GSAP ticker — NOT its own RAF loop:
```ts
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
lenis.on('scroll', ScrollTrigger.update)
```
Breaking this causes ScrollTrigger scrub to desync from smooth scroll.

---

## 8. Theme System

- **Toggle location:** Header, right side (sun/moon icon)
- **Default:** Matches OS `prefers-color-scheme`
- **Storage:** `localStorage` key `"theme"` → `"light"` or `"dark"`
- **Implementation:** `dark` class on `<html>` element → CSS custom properties update

```css
:root          { --color-bg: #ffffff; --color-text: #0a0a0a; ... }
html.dark      { --color-bg: #0a0a0a; --color-text: #fafafa; ... }
```

Flash-of-wrong-theme prevention: synchronous `localStorage` check in `main.tsx` before `ReactDOM.createRoot()`.

---

## 9. Content Structure

### Case Studies (4)
Stored as MDX in `src/content/case-studies/`:
- `glance-tv.mdx`
- `hub-lockscreen.mdx`
- `folderwall.mdx`
- `inmobi-design-system.mdx`

Each follows: **Problem → Approach → Design Process → Solution → `<ProtectedSection>` Impact → Learnings**

### Insights (4)
Stored as MDX in `src/content/insights/` *(rename from `notes/` when refactoring)*:
- `design-in-ai-era.mdx`
- `systems-over-screens.mdx`
- `fail-fast-learn-fast.mdx`
- `invisible-interface.mdx`

### Confidential Sections
Wrapped in `<ProtectedSection>` component inside MDX.
- Password: `glance2025` (hash stored in `src/components/ui/ProtectedSection.tsx`)
- Change the string on line 8 to update the password

---

## 10. Pending Fixes / TODO

### High Priority
- [ ] **Rename "Notes" → "Insights" everywhere** — nav links, section headings, routes (`/insight/:slug`), MDX folder, `DesignNotes.tsx` → `Insights.tsx`, footer
- [ ] **Restore scroll-hijack carousel** — confirm GSAP ScrollTrigger `pin + scrub` is working; verify section pins correctly at `top top`
- [ ] **Fix carousel left alignment** — card track left padding must match header brand text left edge (`clamp(1.5rem, 6vw, 5rem)`)
- [ ] **Increase carousel card width** — target 1.5 cards visible; adjust card `width` to ~`52vw` on desktop
- [ ] **Expand to 8 video cards** — currently 4; add 4 more placeholder cards

### Medium Priority
- [ ] **Hero typography** — switch headline weight to Light/Thin (200–300); remove metrics credibility grid from hero (move to About or remove entirely)
- [ ] **Reading page typography audit** — verify all Case Study and Insight pages match Medium-level readability (20px body, 1.8 line-height, 720px max-width)
- [ ] **Metropolis font** — replace Plus Jakarta Sans with Metropolis (self-hosted or closest available web font)
- [ ] **Section spacing audit** — ensure all sections breathe consistently

### Lower Priority
- [ ] Calendly / Cal.com integration in Contact section
- [ ] Add real video files (transcode Google Glance .mov files with ffmpeg)
- [ ] Custom domain setup (`aswanthraj.com`) via Vercel
- [ ] GitHub remote + Vercel auto-deploy connection

---

## 11. Key File Map

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          ← sticky nav, theme toggle, mobile drawer
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx            ← headline, thin weight, CTAs
│   │   ├── FeaturedWork.tsx    ← GSAP horizontal scroll carousel ⚠️
│   │   ├── CaseStudies.tsx     ← 4 cards grid
│   │   ├── DesignNotes.tsx     ← rename to Insights.tsx
│   │   ├── Philosophy.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── FadeIn.tsx          ← scroll-reveal wrapper
│       └── ProtectedSection.tsx ← password gate for confidential content
├── content/
│   ├── case-studies/           ← 4 MDX files
│   └── notes/                  ← rename to insights/
├── hooks/
│   ├── useLenis.ts             ← GSAP ticker integration (do not change)
│   └── useTheme.ts             ← system detection + localStorage
├── pages/
│   ├── Home.tsx
│   ├── CaseStudy.tsx           ← dynamic MDX loader, fm() helper
│   └── Note.tsx                ← rename to Insight.tsx
├── styles/globals.css          ← CSS vars, typography classes, .btn classes
└── lib/
    ├── utils.ts                ← cn(), formatDate()
    └── api.ts                  ← Phase 2 Supabase stub (empty)

public/
├── resume/aswanthraj_ux_resume_2025.pdf
└── videos/                     ← mp4 files go here (gitignored)
```

---

## 12. Phase 2 (Future — Not Started)

When ready to add a CMS:
- Backend: **Supabase** (PostgreSQL + Storage + Auth)
- Tables: `case_studies`, `insights`, `featured_projects`, `media_assets`
- Admin panel: `/admin` route, TipTap rich text editor, visibility controls
- Stubs already in place: `.env.example` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

---

*Last updated: March 2026*
