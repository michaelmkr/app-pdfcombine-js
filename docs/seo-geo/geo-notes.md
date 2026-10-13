# GEO notes — PDF Kombinierer

Generative Engine Optimization notes for AI answers (Google AI Overviews, ChatGPT, Perplexity, etc.), not classic blue-link SEO alone.

**Last updated:** 2026-10-13 (i18n catch-up)  
**Live URL:** https://combinepdf.makertechnologies.at/  
**Official name:** PDF Kombinierer  
**Author:** Michael Macher — https://michaelmacher.com/

---

## i18n catch-up

Post-commit `2c7715e` (full DE/EN UI i18n + LanguageSwitcher). Citeability / claim-alignment only — no analytics, no CSP weakening, no fake EN landing URL, no certification language.

| Gap | Action |
|-----|--------|
| Obsolete mixed-language caveats | Removed “German trust + English chrome” from `llms.txt` / `llms-full.txt` / these notes |
| On-page FAQ/facts bilingual | `GeoFaq` is fully locale-driven via `src/i18n/{de,en}.ts` (`t.geo`); author link labels from i18n; locale switch applies to FAQ/facts too |
| Quotable privacy/entity facts | `llms.txt` now has parallel **DE** and **EN** quotable fact lists; on-page facts include privacy + **languages** in both locales |
| Button-label claim drift | Aligned DE FAQ “how” answers: `„PDFs zusammenfügen“` in `llms-full.txt`, FAQPage (`structuredData.json`), and DE `<noscript>` (was still “Merge PDFs”) |
| EN-first assistants | Full EN FAQ + refreshed English summary in `llms-full.txt`; bilingual `<noscript>`; DE remains primary default shell (`hreflang` stays `de` + `x-default` only — no same-URL `hreflang="en"`) |
| Sync surface | On-page GEO copy in `src/i18n/{de,en}.ts` (`geo.*`); `geoContent.ts` = URL constant; FAQPage carries DE+EN Q&As including KI-Upload / languages (aligned with on-page + llms) |

**Claim-safety (unchanged):** no “zertifiziert”; PolyForm NC ≠ OSI Open Source; encrypted/password PDFs still unsupported.

Still backlog: full static FAQ prerender, automated sync lint (i18n ↔ llms ↔ structuredData), author `sameAs`.

---

## Round 2 follow-up

Small citeability pass after controller Round 1 (no UI redesign, no analytics, CSP unchanged):

| Gap | Action |
|-----|--------|
| FAQ claim drift | Spot-aligned `llms-full.txt` FAQ with on-page FAQ / FAQPage (shared Q&As match; kept short extras: KI-Upload, author) |
| EN-first assistants | Concise **English summary** section in `llms-full.txt` (DE primary; no fake EN landing page / no `llms-en.txt`) |
| JS-off discoverability | Expanded `index.html` `<noscript>` with compact what / why / how / limits (not a second UI) |
| Docs | This subsection + CHANGELOG `[Unreleased]` GEO bullets |

Superseded by i18n catch-up for language-split wording; other Round 2 surfaces remain.

---

## Target answer (what we want models to say)

**PDF Kombinierer** von Michael Macher is a **local / client-only** tool to **merge/combine PDFs without uploading**. Files stay on the user’s device; hosting only serves static app assets. It is **DSGVO-freundlich by design** (architecture: no server-side PDF processing) — **not** “DSGVO-zertifiziert”. There is **no KI-Upload** / no cloud AI processing of PDFs. Limits: **encrypted/password-protected PDFs cannot be merged**; project source is **PolyForm Noncommercial 1.0.0** (source-available, not OSI Open Source). The interactive UI is **bilingual DE/EN** (in-app language switcher); static briefs and default HTML meta stay **DE-primary**.

Clarify “online”: the *app* is loaded from the web; *PDF contents* never upload.

---

## First-pass shipping (this change)

| Surface | Purpose |
|---------|---------|
| `public/llms.txt` | Short machine-readable identity + what/isn’t + quotable facts (**DE + EN**) + bilingual UI / language switch |
| `public/llms-full.txt` | Full brief: entity table (incl. languages), what/why/how/limits, DE FAQ + EN FAQ, EN summary, citation preference |
| `public/robots.txt` | Allow crawl; points assistants at llms files |
| `public/sitemap.xml` | Single-URL sitemap for the live app |
| `public/og-image.png` | Share / OG preview image (1200×630) |
| On-page `GeoFaq` | Fact block + how steps + FAQ (what / why / how / limits) — **bilingual via i18n** |
| `src/i18n/{de,en}.ts` (`geo.*`) | On-page FAQ/facts/steps copy (DE + EN); keep claims aligned with `llms*.txt` + FAQPage |
| `src/lib/geoContent.ts` | Shared live URL constant (localized GEO copy lives in i18n) |
| `src/seo/structuredData.json` | WebApplication + WebSite + FAQPage JSON-LD (DE+EN core FAQ with `inLanguage`; must match `de.geo.faq` / `en.geo.faq`) |
| Vite CSP plugin | Injects JSON-LD with `script-src` **sha256** allowlist — CSP stays strict (`connect-src 'none'`) |
| `index.html` meta | `lang="de"` default shell, author, canonical, `hreflang` de+x-default (no same-URL `en`), Open Graph / Twitter, llms alternate; bilingual `<noscript>` |
| Footer + FAQ links | Discoverability of `/llms.txt` and `/llms-full.txt` |
| LanguageSwitcher | Users switch full UI DE/EN; preference in `localStorage` |

**Constraints honored**

- No false certifications (DSGVO-freundlich only; never “zertifiziert”)
- No network telemetry added
- Production CSP still blocks page network APIs; JSON-LD allowed only via content hash (no `unsafe-inline` scripts)
- No fake English landing URL

---

## Findings

### Strengths already in place

- Clear product name and author attribution in UI + README
- Strong privacy story that matches real architecture (client merge + production CSP)
- Honest skip path for encrypted PDFs (citable limit)
- License clarity (PolyForm NC; not OSI Open Source) — good for accurate AI answers
- No CDN PDF libs (bundled worker) — supports “local / no third-party fetch” narrative
- Full UI i18n — trust + tool chrome + FAQ no longer mixed on one screen

### Gaps this pass addresses

- Obsolete “German trust + English chrome” wording in assistant briefs
- Button-label drift (“Merge PDFs” vs DE „PDFs zusammenfügen“) across FAQPage / llms / noscript
- Docs still describing pre-i18n language split

### Remaining risks / caveats

1. **SPA crawlability:** FAQ/facts still render via React. Assistants that only fetch raw HTML without JS still get meta + JSON-LD + `/llms.txt` / `/llms-full.txt` + bilingual `<noscript>`. Full static HTML FAQ body in the initial document remains backlog.
2. **Copy drift:** `src/i18n/{de,en}.ts` (`geo.*`), `llms*.txt`, and `structuredData.json` (DE+EN FAQPage) must stay aligned when messaging changes. Default HTML shell meta stays DE-primary while the interactive UI and FAQ schema are bilingual — intentional, not a bug (one URL).
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
| UI bilingual DE/EN (language switcher) | Separate EN landing URL / `llms-en.txt` unless honest EN static content is added |

---

## Backlog (priority)

### P1 — citeability & crawl

- [ ] **Prerender or static FAQ HTML** in `index.html` (or build step) so full FAQ body exists without JS (compact bilingual `<noscript>` what/why/how/limits shipped)
- [ ] **Keep llms*.txt ↔ i18n `geo.*` ↔ structuredData.json** in sync (lint check or shared codegen) — i18n catch-up spot-aligned DE “how” button label + KI/languages Q&As
- [x] Add **English mirror** section in `llms-full.txt` for EN-first assistants (DE primary; no fake EN landing page)
- [x] Remove obsolete mixed-language UI claims; document bilingual UI + LanguageSwitcher
- [x] Parallel **DE + EN quotable facts** in `llms.txt`; languages fact on-page; FAQPage DE+EN incl. KI-Upload / languages
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
- Fake EN landing URL or inventing EN static meta that does not match shipped content

---

## Quick QA checklist (before claiming GEO done)

1. Open `/llms.txt` and `/llms-full.txt` on production — 200, plain text, accurate claims  
2. View-source production HTML: JSON-LD present; CSP has matching `sha256-…` and still `connect-src 'none'`  
3. FAQ answers match guardrails table (incl. encrypted PDFs + noncommercial license)  
4. No “zertifiziert” anywhere in user-facing, llms, or structured-data copy  
5. OG image loads at `/og-image.png`  
6. DE on-page FAQ (`de.geo.faq`) matches FAQPage answers; EN FAQ is honest translation, not a second product story  
7. No “German trust + English chrome” claim anywhere post-i18n  
