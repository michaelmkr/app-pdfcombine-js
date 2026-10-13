# SEO notes — PDF Kombinierer

Classic search / SERP / crawler notes (Google, Bing, social previews). For assistant citeability see [`geo-notes.md`](./geo-notes.md).

**Last updated:** 2026-10-13 (Round 2 follow-up)  
**Live URL:** https://combinepdf.makertechnologies.at/  
**Official name:** PDF Kombinierer  
**Author:** Michael Macher — https://michaelmacher.com/  
**License:** PolyForm Noncommercial 1.0.0 (source-available; not OSI Open Source)

---

## Round 2 follow-up (2026-10-13)

Short controller-assigned pass — no ranking claims.

| Item | Result |
|------|--------|
| Production `npm run build` → `dist/index.html` | **OK:** `application/ld+json` injected from `src/seo/structuredData.json`; CSP `script-src` includes matching `sha256-…`; `connect-src 'none'` intact; no `unsafe-inline` on scripts |
| README discoverability | **OK as-is:** live URL + `llms.txt` / `llms-full.txt` + `docs/seo-geo` SEO/GEO notes (no bloat added) |
| CHANGELOG `[Unreleased]` SEO bullets | Reviewed; kept claim-safe; noted this verify-only follow-up |
| Author `sameAs` | **Skipped** — michaelmacher.com is in README, but no GitHub repo URL appears in README |

No keywords meta, analytics, Remotion, or CSP weakening.

---

## Positioning (SERP intent)

**Primary market:** DACH users who want to merge PDFs in the browser **without uploading**, often with a privacy / DSGVO angle.

**Product identity in results:** Brand **PDF Kombinierer** + author Michael Macher should remain visible in title/description when possible. Trust copy (no upload, local, no KI-Upload) is a ranking *and* conversion asset — do not sacrifice it for keyword density.

**“Online” wording:** Allowed in title/meta when paired with **ohne Upload** / **lokal**. “Online” means the app is loaded from the web; PDF contents stay on-device. Never imply server-side merge.

---

## Target keywords

### German (primary)

| Cluster | Examples | Notes |
|---------|----------|--------|
| Core merge | PDF zusammenfügen, PDF kombinieren, PDF mergen | Core verbs; brand = Kombinierer |
| No-upload | PDF mergen ohne Upload, PDF zusammenfügen ohne Upload, PDFs lokal verbinden | Differentiator; highest trust intent |
| Privacy | DSGVO-freundlich PDF, PDF zusammenfügen Datenschutz | Architecture claim only — see guardrails |
| Brand / entity | PDF Kombinierer, Michael Macher | Navigational / entity |

### English (secondary)

| Cluster | Examples | Notes |
|---------|----------|--------|
| Core | merge PDFs online, combine PDF files | Compete only where privacy angle fits |
| No-upload | merge PDFs without uploading, local PDF merger | Aligns with product truth |
| Privacy | privacy-friendly PDF merge, client-side PDF combiner | Prefer over “GDPR certified” |

**Do not chase:** full PDF editor, OCR, e-sign, password unlock, “best free PDF tool 2026” listicle spam, fake review SERPs.

---

## On-page — shipped vs gaps

### Shipped

| Surface | Status |
|---------|--------|
| `index.html` `<title>` + meta description | Keyword-aware DE; includes ohne Upload + DSGVO-freundlich (nicht zertifiziert) + brand/author |
| `html lang="de"` | Matches primary trust language |
| Canonical | `https://combinepdf.makertechnologies.at/` |
| `hreflang` de + x-default | Same URL (single-locale SPA); no fake EN URL |
| `meta robots` | `index, follow, max-image-preview:large` |
| Author / application-name | Michael Macher / PDF Kombinierer |
| Keywords meta | Omitted (low modern SEO weight; avoid stuffing) |
| TrustHero | Privacy-first lead with natural kombinieren/mergen phrasing |
| GeoFaq (visible DE FAQ + facts) | Below tool; citeable what/why/how/limits; complements classic on-page text |
| Footer | Impressum + `/llms.txt` |
| OG / Twitter | Title, description, 1200×630 `og-image.png`, alts |
| Theme color | Brand `#6e1622` |
| `<noscript>` facts block | Short DE privacy/license summary in HTML shell for non-JS clients |

### Gaps / tensions

1. **SPA crawlability:** Main FAQ/facts still render via React. Non-JS crawlers get meta + JSON-LD (build-injected) + `<noscript>` + static `/llms*.txt`. Richer static FAQ HTML in the initial document remains backlog (shared with GEO P1).
2. **Keyword vs trust-copy tension:** Title/meta may use “kombinieren / zusammenfügen / mergen”; **visible hero must stay trust-first**. GeoFaq heading uses natural “PDFs lokal zusammenfügen” — avoid repeating the full verb triad in UI.
3. **Bilingual UI:** German trust + English chrome can look mixed to crawlers; document in meta/GEO rather than forcing EN hero.
4. **Keywords meta** omitted on purpose; do not reintroduce stuffing lists.
5. **No separate EN landing URL** — English is secondary discovery only (meta/OG alternate locale hints, not a second page).

---

## Technical SEO

### Canonical, robots, sitemap

| Asset | Path | Notes |
|-------|------|--------|
| Canonical | `index.html` | Absolute live URL; trailing slash |
| Robots | `public/robots.txt` | `Allow: /`; Sitemap absolute URL; comments for llms / OG |
| Sitemap | `public/sitemap.xml` | Single URL; `lastmod` + weekly changefreq |
| Hosting | Static SPA | No server redirects assumed; keep one canonical host |

**Accuracy rules**

- Do not list URLs that 404.
- Expand sitemap only when real extra crawlable documents exist (static FAQ page, etc.).
- Do not `Disallow` `/assets/` unless caching/CDN requires it — JS bundles are needed for full render.

### Open Graph / Twitter

- `og:type` website; `og:locale` `de_AT` + alternates `de_DE`, `en_US`
- Absolute `og:image` / `twitter:image` → `/og-image.png` (1200×630)
- Descriptions restate no-upload + not-zertifiziert where privacy is claimed
- No `twitter:site` until an official handle exists

### Schema.org (JSON-LD)

| Piece | Source of truth | Published |
|-------|-----------------|-----------|
| Graph: `WebApplication` + `WebSite` + `FAQPage` | **`src/seo/structuredData.json`** | Injected into production `index.html` at build by `vite.config.ts` |

Do not add a parallel `public/structured-data.json` unless it is generated from the same source — dual files drifted once.

**Claims encoded in schema (must stay true)**

- Free (`Offer` price 0 EUR), client-only browser app
- Creator/publisher: Michael Macher + michaelmacher.com
- License URL: PolyForm NC 1.0.0
- FAQ answers: no upload, “online ≠ upload”, DSGVO-freundlich **not** zertifiziert, encrypted PDFs skipped, **not** OSI Open Source

**Never add:** `AggregateRating` / fake reviews, `Certification` / DSGVO badges, `applicationCategory` spam, competitor `sameAs` smears.

---

## Privacy / CSP conflicts (critical)

Production CSP (meta, build-only — skipped in Vite dev for HMR):

- `connect-src 'none'` — core privacy story; **do not weaken** for analytics, tag managers, or “SEO” beacons
- `script-src 'self' 'wasm-unsafe-eval' 'sha256-…'` — **no `unsafe-inline`**
- No third-party scripts, fonts CDNs, or pixel trackers

### Inline JSON-LD vs `script-src`

Naive `<script type="application/ld+json">…</script>` in source HTML would conflict with a strict `script-src` that disallows inline scripts in browsers that enforce CSP on that element.

**Current solution (shipped):**

1. Read `src/seo/structuredData.json` at Vite config load time.
2. Inject `<script type="application/ld+json">…</script>` in `transformIndexHtml`.
3. Allowlist the **exact script body** via `'sha256-…'` on `script-src`.

**Ops rules**

- Edit schema only in `src/seo/structuredData.json` (keep FAQ answers aligned with `geoContent.ts`).
- Recompute happens automatically on next build; changing JSON without rebuild leaves prod hash/body mismatched until rebuild.
- **Do not** add `unsafe-inline` or loosen `connect-src` to “make SEO easier”.
- Prefer this hash approach over Remotion or any client-side schema injector that fetches remote JSON (`connect-src 'none'` would block that anyway).

### Other privacy tensions

| Temptation | Decision |
|------------|----------|
| Google Search Console HTML tag / analytics | Out of scope; use DNS/HTML file verification if needed without JS telemetry |
| External font/CDN for “performance SEO” | No — self-host; privacy + CSP |
| Prerender SaaS that phones home | Only static/local prerender that preserves CSP |
| Rich Results with ratings | Forbidden (fake trust) |

---

## Keyword vs trust-copy tension

| Layer | Role |
|-------|------|
| `<title>` / meta / OG | Keyword discovery + honest differentiator |
| TrustHero | **Trust conversion** — no verb-triad stuffing |
| GeoFaq | Citeable facts for humans + assistants; natural DE |
| Tool chrome | English UX; do not DE-keyword-stuff buttons |

If SERP CTR and on-site trust diverge, **prefer trust**. Privacy is the product moat.

---

## Claim guardrails (SEO + GEO shared)

| Do say | Don’t say |
|--------|-----------|
| DSGVO-freundlich / privacy-friendly by design | DSGVO-zertifiziert / GDPR-certified |
| Kein Upload / lokal im Browser | “Zero data collection” if prefs/`localStorage` exist |
| Kein KI-Upload / keine KI-Cloud-Verarbeitung | AI Act certified / “AI-powered PDF tool” |
| Source-available, PolyForm Noncommercial | “Open Source” (OSI) without qualification |
| Encrypted PDFs cannot be opened here | Supports password-protected PDFs |
| Free to use in the browser | Fake star ratings / review schema |

Align meta, OG, JSON-LD, README, llms*.txt, and GeoFaq whenever claims change.

---

## Coordination with GEO

| Classic SEO | GEO |
|-------------|-----|
| Title, description, canonical, robots, sitemap, OG, JSON-LD | `llms.txt`, `llms-full.txt`, GeoFaq, entity packaging |
| Ranking + snippet control | Answer engine citeability |
| CSP-safe schema injection | Same CSP constraints; prefer static briefs if JS-off |

Keep [`geo-notes.md`](./geo-notes.md) claim table and this file’s guardrails identical in spirit. Copy drift between `geoContent.ts`, `llms*.txt`, and `structuredData.json` is a joint P1 risk.

---

## Backlog

### P1 — crawl & consistency

- [ ] Prerender or static FAQ HTML in initial document (JS-off parity)
- [ ] Single source / check that `structuredData.json` ↔ `geoContent.ts` FAQ claims stay aligned
- [ ] After claim edits: rebuild and spot-check dist CSP hash still matches JSON-LD body
- [ ] Search Console (or Bing) property via non-tracking verification; submit sitemap

### P2 — entity & snippet quality

- [ ] Optional `sameAs` for author (michaelmacher.com, GitHub) once URLs are stable and wanted
- [ ] Refine OG image if brand system updates (keep 1200×630)
- [ ] If a real EN FAQ page appears, add proper `hreflang` pair — never invent a second URL

### P3 — measurement & content ops

- [ ] Manual query spot-checks: “PDF zusammenfügen ohne Upload”, “PDF mergen lokal”, brand navigational
- [ ] Watch for Rich Results / FAQ eligibility without chasing invalid markup
- [ ] Expand sitemap only when new indexable URLs ship
- [ ] Performance hygiene (bundle size) without third-party RUM

### Explicit non-goals

- Analytics, tag managers, heatmaps, affiliate cloaking
- Fake reviews, certifications, or Open Source mislabeling
- Weakening production CSP
- Remotion or heavy media pipelines for SEO assets
- Keyword-stuffed TrustHero / brand layout changes for ranking

---

## Quick QA checklist (classic SEO)

1. Live `/` returns 200; canonical absolute HTTPS host matches
2. `/robots.txt` and `/sitemap.xml` 200; sitemap loc matches canonical
3. `/og-image.png` 200; ~1200×630; referenced absolutely in meta
4. View production HTML source: JSON-LD present; CSP includes matching `sha256` for that body; `connect-src 'none'` intact
5. Title/description: no “zertifiziert”; PolyForm/Open Source claims accurate if present
6. TrustHero still trust-first (not a keyword list)
7. No analytics scripts introduced

---

## Catch-up verification (2026-10-13)

- Production build injects JSON-LD; CSP `script-src` sha256 matched the injected body in a local `npm run build` check.
- No `public/structured-data.json` mirror (single source: `src/seo/structuredData.json`).
- Keywords meta remains omitted; TrustHero stays trust-first; `<noscript>` covers minimal JS-off facts.
