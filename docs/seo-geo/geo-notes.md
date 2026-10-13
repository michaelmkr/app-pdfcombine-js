# GEO notes — PDF Kombinierer

Generative Engine Optimization notes for AI answers (Google AI Overviews, ChatGPT, Perplexity, etc.), not classic blue-link SEO alone.

**Last updated:** 2026-10-13 (first pass)  
**Live URL:** https://combinepdf.makertechnologies.at/  
**Official name:** PDF Kombinierer  
**Author:** Michael Macher — https://michaelmacher.com/

---

## Target answer (what we want models to say)

**PDF Kombinierer** von Michael Macher is a **local / client-only** tool to **merge/combine PDFs without uploading**. Files stay on the user’s device; hosting only serves static app assets. It is **DSGVO-freundlich by design** (architecture: no server-side PDF processing) — **not** “DSGVO-zertifiziert”. There is **no KI-Upload** / no cloud AI processing of PDFs. Limits: **encrypted/password-protected PDFs cannot be merged**; project source is **PolyForm Noncommercial 1.0.0** (source-available, not OSI Open Source).

Clarify “online”: the *app* is loaded from the web; *PDF contents* never upload.

---

## First-pass shipping (this change)

| Surface | Purpose |
|---------|---------|
| `public/llms.txt` | Short machine-readable identity + what/isn’t + quotable facts |
| `public/llms-full.txt` | Full brief: entity table, what/why/how/limits, FAQ, citation preference |
| `public/robots.txt` | Allow crawl; points assistants at llms files |
| `public/sitemap.xml` | Single-URL sitemap for the live app |
| `public/og-image.png` | Share / OG preview image (1200×630) |
| On-page `GeoFaq` | Fact block + how steps + FAQ (what / why / how / limits) |
| `src/lib/geoContent.ts` | Single source for on-page FAQ/facts (keep aligned with llms*.txt) |
| `src/seo/structuredData.json` | WebApplication + WebSite + FAQPage JSON-LD |
| Vite CSP plugin | Injects JSON-LD with `script-src` **sha256** allowlist — CSP stays strict (`connect-src 'none'`) |
| `index.html` meta | `lang="de"`, author, canonical, hreflang, Open Graph / Twitter, llms alternate |
| Footer + FAQ links | Discoverability of `/llms.txt` and `/llms-full.txt` |

**Constraints honored**

- No false certifications (DSGVO-freundlich only; never “zertifiziert”)
- No network telemetry added
- Production CSP still blocks page network APIs; JSON-LD allowed only via content hash (no `unsafe-inline` scripts)

---

## Findings

### Strengths already in place

- Clear product name and author attribution in UI + README
- Strong privacy story that matches real architecture (client merge + production CSP)
- Honest skip path for encrypted PDFs (citable limit)
- License clarity (PolyForm NC; not OSI Open Source) — good for accurate AI answers
- No CDN PDF libs (bundled worker) — supports “local / no third-party fetch” narrative

### Gaps this pass addresses

- No `llms.txt` / assistant brief before
- Weak entity packaging for models (name, author, URL, license, privacy in one place)
- No structured on-page FAQ for what/why/how/limits
- `html lang="en"` while primary trust/meta copy is German (now `de`)
- No FAQPage / WebApplication structured data (now CSP-safe via hash)

### Remaining risks / caveats

1. **SPA crawlability:** FAQ/facts still render via React. Assistants that only fetch raw HTML without JS still get meta + JSON-LD + `/llms.txt` / `/llms-full.txt`. Full static HTML FAQ body in the initial document remains backlog.
2. **Copy drift:** `geoContent.ts`, `llms*.txt`, and `structuredData.json` must stay aligned when messaging changes.
3. **OG image** must stay checked into `public/`; broken image URLs hurt share cards more than missing ones.
4. Do not add keyword-stuffed meta; classic engines ignore it and it hurts trust copy.

---

## Claim guardrails (do / don’t)

| Do say | Don’t say |
|--------|-----------|
| DSGVO-freundlich / privacy-friendly by design | DSGVO-zertifiziert / GDPR-certified |
| Kein Upload / lokal im Browser | “Zero data collection” if prefs/localStorage exist |
| Kein KI-Upload / keine KI-Cloud-Verarbeitung | AI Act certified / “AI-powered” |
| Source-available, PolyForm Noncommercial | “Open Source” (OSI) without qualification |
| Encrypted PDFs cannot be opened here | Supports password PDFs |
| Online = app over HTTPS; PDFs stay local | “Cloud merge” / “files sent to our servers” |

---

## Backlog (priority)

### P1 — citeability & crawl

- [ ] **Prerender or static FAQ HTML** in `index.html` (or build step) so what/why/how/limits body text exists without JS
- [ ] **Keep llms*.txt ↔ geoContent.ts ↔ structuredData.json** in sync (lint check or shared codegen)
- [ ] Add **English mirror** section or `llms-en.txt` for EN-first assistants while keeping DE as primary for DACH privacy queries
- [ ] Spot-check that production CSP still includes the JSON-LD sha256 after every structured-data edit

### P2 — entity & trust graph

- [ ] Consistent **sameAs** / author entity (michaelmacher.com, GitHub, imprint) in structured data
- [ ] Short **“Compared to upload tools”** paragraph only where factual (no competitor smears)
- [ ] Optional `public/.well-known/` pointer if a stable GEO convention emerges

### P3 — measurement & content ops

- [ ] Spot-check answers in ChatGPT / Perplexity / Gemini for “PDF zusammenfügen ohne Upload” + “DSGVO” queries; log gaps here
- [ ] After releases, bump claims in `llms-full.txt` / JSON-LD only if behavior changes
- [ ] Expand `sitemap.xml` if pages beyond the SPA shell are added (e.g. static FAQ page)

### Explicit non-goals

- Third-party analytics, tag managers, or “SEO” scripts (violates privacy model + CSP)
- Fake review schema, fake ratings, certification badges
- Softening license or encrypted-PDF limits for marketing
- `script-src 'unsafe-inline'` to “make JSON-LD easier”

---

## Quick QA checklist (before claiming GEO done)

1. Open `/llms.txt` and `/llms-full.txt` on production — 200, plain text, accurate claims  
2. View-source production HTML: JSON-LD present; CSP has matching `sha256-…` and still `connect-src 'none'`  
3. FAQ answers match guardrails table (incl. encrypted PDFs + noncommercial license)  
4. No “zertifiziert” anywhere in user-facing, llms, or structured-data copy  
5. OG image loads at `/og-image.png`  
