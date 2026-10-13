# SEO notes — PDF Kombinierer

Classic search / SERP / crawler notes (Google, Bing, social previews). For assistant citeability see [`geo-notes.md`](./geo-notes.md).

**Last updated:** 2026-10-13 (i18n SEO re-audit)  
**Live URL:** https://combinepdf.makertechnologies.at/  
**Official name:** PDF Kombinierer  
**Author:** Michael Macher — https://michaelmacher.com/  
**License:** PolyForm Noncommercial 1.0.0 (source-available; not OSI Open Source)

---

## i18n model (post-2c7715e)

**One canonical URL, client-side language switch.** There is no separate English landing path. Inventing `/en` (or any second crawlable URL) is a non-goal until a real static EN document ships.

| Layer | Language behavior |
|-------|-------------------|
| Canonical / sitemap / robots | Single URL: `https://combinepdf.makertechnologies.at/` |
| Static HTML shell (`index.html`) | **DE primary** for SERP: `lang="de"`, DE title/description, DE OG/Twitter defaults; bilingual `<noscript>` (`lang="de"` + `lang="en"` articles); FAQPage JSON-LD DE+EN |
| `hreflang` | `de` + `x-default` → same URL only. **No** `hreflang="en"` on the same URL (would imply a distinct EN document that does not exist) |
| `og:locale` | Primary `de_AT`; alternates `de_DE`, `en_US` as **locale hints**, not alternate page URLs |
| Client after hydrate | Full UI DE/EN via `src/i18n` + header switcher; preference in `localStorage` (`pdf-kombinierer-locale`); browser `de*` → DE else EN (fallback DE) |
| Runtime DOM | `document.documentElement.lang` + title / meta description / OG+Twitter title+description + `og:locale` (`de_AT` / `en_US`) + image alts update with locale (helps a11y + human share after switch; **crawlers still see the DE shell**) |
| JSON-LD (build-injected) | `WebApplication` / `WebSite` / `FAQPage` `inLanguage` include `de`+`en`; FAQ `mainEntity` has DE + EN Q&As each tagged `inLanguage` (DE answers remain primary for DACH SERP intent) |

**Obsolete framing (do not revive):** “German trust + English tool chrome” / mixed-language UI. As of commit `2c7715e`, locale applies to the full UI (trust, gallery, merge bar, errors, FAQ/GEO, empty states).

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

EN discovery today: client UI + bilingual FAQPage / `<noscript>` / `llms-full.txt` EN FAQ + OG `en_US` locale alternate — **not** a second indexed URL.

**Do not chase:** full PDF editor, OCR, e-sign, password unlock, “best free PDF tool 2026” listicle spam, fake review SERPs.

---

## On-page — shipped vs gaps

### Shipped

| Surface | Status |
|---------|--------|
| `index.html` `<title>` + meta description | Keyword-aware **DE** shell; includes ohne Upload + DSGVO-freundlich (nicht zertifiziert) + brand/author |
| Client meta (`src/i18n` de/en `meta.*`) | Title, description, `ogImageAlt`; applied to document + OG/Twitter/`og:locale` on locale switch |
| `html lang="de"` (shell) | DE primary for crawlers; runtime may become `en` after client switch |
| Canonical | `https://combinepdf.makertechnologies.at/` |
| `hreflang` de + x-default | Same URL; no fake EN URL |
| `meta robots` | `index, follow, max-image-preview:large` |
| Author / application-name | Michael Macher / PDF Kombinierer |
| Keywords meta | Omitted (low modern SEO weight; avoid stuffing) |
| TrustHero | Privacy-first lead; full UI localized (no mixed DE/EN chrome) |
| GeoFaq | Localized via i18n; JSON-LD FAQ mirrors DE + EN on-page answers (with `inLanguage`) |
| Footer | Impressum + `/llms.txt` (localized chrome) |
| OG / Twitter | DE shell title/description/`og:locale=de_AT`; 1200×630 `og-image.png`; client refreshes title/description/`og:locale`/alts on locale change |
| Theme color | Brand `#6e1622` |
| `<noscript>` facts block | Bilingual DE + EN articles (`lang` attributes); locale-consistent button labels (no mixed chrome) |

### Gaps / tensions

1. **SPA crawlability:** Main FAQ/facts still render via React. Non-JS crawlers get meta + JSON-LD (build-injected) + `<noscript>` + static `/llms*.txt`. Richer static FAQ HTML in the initial document remains backlog (shared with GEO P1).
2. **Keyword vs trust-copy tension:** Title/meta may use “kombinieren / zusammenfügen / mergen”; **visible hero must stay trust-first**. GeoFaq heading uses natural “PDFs lokal zusammenfügen” — avoid repeating the full verb triad in UI.
3. **i18n vs crawlers:** EN UI/meta after hydrate is largely invisible to classic bots; SERP snippets stay DE-primary by design. Do not fake an EN URL to “fix” that.
4. **Bilingual FAQPage on one URL:** Schema ships DE+EN Q&As (GEO i18n catch-up). Claim-accurate and `inLanguage`-tagged, but may look “mixed” to snippet systems vs DE-only shell — watch Rich Results; do not add a second URL to “solve” it.
5. **Keywords meta** omitted on purpose; do not reintroduce stuffing lists.
6. **No separate EN landing URL** — English is secondary discovery only (client switch + GEO EN FAQ/summary + OG locale alternate).

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
- Client locale switch updates OG/Twitter **title/description**, **`og:locale`**, and image alts for humans; it does **not** invent a second `og:url` (correct for single-URL SPA). Crawlers/share scrapers that never execute JS still see the DE shell.

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
- UI control names in DE FAQ text match DE i18n (e.g. „PDFs zusammenfügen“); EN FAQ uses “Merge PDFs”
- `inLanguage`: app/site/FAQ graph advertise DE+EN; static HTML meta/hreflang stay DE-primary (no EN URL)

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

- Edit schema only in `src/seo/structuredData.json` (keep FAQ answers aligned with `src/i18n` DE **and** EN FAQ).
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
| `<title>` / meta / OG (shell) | Keyword discovery + honest differentiator (DE) |
| Client `meta.*` i18n | Same role after locale switch; not a second URL |
| TrustHero | **Trust conversion** — no verb-triad stuffing; localized with rest of UI |
| GeoFaq | Citeable facts for humans + assistants; natural wording per locale |
| Tool chrome | Localized with locale; do not keyword-stuff buttons |

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
| Full UI DE/EN via client switch (one URL) | Mixed DE trust / EN chrome; fake EN landing |

Align meta, OG, JSON-LD, README, llms*.txt, and GeoFaq whenever claims change.

---

## Coordination with GEO

| Classic SEO | GEO |
|-------------|-----|
| Title, description, canonical, robots, sitemap, OG, JSON-LD | `llms.txt`, `llms-full.txt`, GeoFaq, entity packaging |
| Ranking + snippet control | Answer engine citeability |
| CSP-safe schema injection | Same CSP constraints; prefer static briefs if JS-off |
| DE shell + optional client EN | DE briefs primary; `llms*.txt` + FAQPage also carry EN FAQ (still one URL) |

Keep [`geo-notes.md`](./geo-notes.md) claim table and this file’s guardrails identical in spirit. Copy drift between i18n FAQ (DE/EN), `llms*.txt`, and `structuredData.json` is a joint P1 risk. Assistants that cite “mixed-language UI” are outdated after `2c7715e`.

---

## Backlog

### P1 — crawl & consistency

- [ ] Prerender or static FAQ HTML in initial document (JS-off parity)
- [ ] Single source / check that `structuredData.json` ↔ i18n FAQ (DE **and** EN) stay aligned
- [ ] After claim edits: rebuild and spot-check dist CSP hash still matches JSON-LD body
- [ ] Search Console (or Bing) property via non-tracking verification; submit sitemap

### P2 — entity & snippet quality

- [ ] Optional `sameAs` for author (michaelmacher.com, GitHub) once URLs are stable and wanted
- [ ] Refine OG image if brand system updates (keep 1200×630)
- [ ] If a real EN FAQ / landing URL appears, add proper `hreflang` pair — never invent a second URL
- [ ] Optional: keep shell meta and `src/i18n/de.ts` `meta.*` in sync via shared constant or lint

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
- Fake EN pages or `hreflang="en"` pointing at the DE-only shell URL

---

## Quick QA checklist (classic SEO)

1. Live `/` returns 200; canonical absolute HTTPS host matches
2. `/robots.txt` and `/sitemap.xml` 200; sitemap loc matches canonical
3. `/og-image.png` 200; ~1200×630; referenced absolutely in meta
4. View production HTML source: JSON-LD present; CSP includes matching `sha256` for that body; `connect-src 'none'` intact
5. Title/description: no “zertifiziert”; PolyForm/Open Source claims accurate if present
6. TrustHero still trust-first (not a keyword list); UI language is consistent per locale
7. No analytics scripts introduced
8. No docs/llms claims of mixed DE trust / EN chrome

---

## i18n SEO re-audit (2026-10-13)

Findability pass after full DE/EN UI i18n (`2c7715e`). No ranking claims. Claim surfaces coordinated with GEO i18n catch-up.

| Item | Result |
|------|--------|
| Mixed-language UI framing | **Rewritten** — single-URL SPA + client switch; DE shell primary for SERP/hreflang |
| Meta title/description + locale | **OK:** `src/i18n` `meta.*` (incl. `ogImageAlt`); runtime updates title, description, OG/Twitter, `og:locale`, image alts |
| `hreflang` / canonical | **Kept `de` + `x-default` only;** no same-URL `hreflang="en"` (no distinct EN document) |
| robots / sitemap / OG image | **OK:** single loc, absolute sitemap, absolute `og-image.png` |
| FAQPage / structured data | **Bilingual:** DE+EN Q&As with per-entity `inLanguage`; WebApplication/WebSite/FAQPage `inLanguage: ["de","en"]` |
| Crawlable HTML / `<noscript>` | **Bilingual** `<article lang>` blocks; no DE/EN label mix inside a locale block |
| `llms.txt` / `llms-full.txt` | Full UI i18n documented; DE+EN FAQ; no mixed-chrome claim |
| TrustHero redesign | **Skipped** (out of scope) |
| CSP / analytics / keywords meta / fake EN page | **Not weakened** / not added |
| Production `npm run build` after schema | JSON-LD inject + matching `sha256`; `connect-src 'none'` intact |

No keywords meta, analytics, Remotion, or CSP weakening.
