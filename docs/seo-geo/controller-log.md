# Controller log — SEO + GEO loop

**Product:** PDF Kombinierer (Michael Macher)  
**Live:** https://combinepdf.makertechnologies.at/  
**Loop date:** 2026-10-13  
**Constraint reminders:** no push; preserve privacy CSP / PolyForm NC; no Remotion; don’t destroy brand UI.

---

## Reality check (what on-page / GEO can and cannot guarantee)

**Can improve (owned surfaces):**

- Snippet quality: title, description, OG/Twitter, brand/author entity clarity
- Crawl basics: canonical, robots, sitemap, `lang`, absolute OG image
- Citeability for answer engines: `llms.txt` / `llms-full.txt`, on-page FAQ/facts, CSP-safe JSON-LD
- Trust differentiation: “ohne Upload / lokal / kein KI-Upload / DSGVO-freundlich by design (nicht zertifiziert)”

**Cannot guarantee:**

- Ranking **#1** for competitive “merge PDF” / “PDF zusammenfügen” / “combine PDF online” head terms
- Those SERPs are dominated by sites with years of backlinks, brand recognition, content hubs, and often commercial SEO programs
- On-page + GEO alone do **not** create domain authority, editorial links, or instant AI Overview citations
- Winning competitive merge terms needs **time**, **external links/mentions**, and usually broader content/distribution — outside this SPA’s meta/FAQ pass

**Honest success bar for this loop:** be accurately discoverable and quotable for *privacy / no-upload / local* intent and brand navigational queries; stay claim-safe; don’t fake authority.

---

## Round 0 — Wait / gather

| Source | Status |
|--------|--------|
| `docs/seo-geo/geo-notes.md` | Present (specialist first pass + align notes) |
| `docs/seo-geo/seo-notes.md` | Missing initially → catch-up SEO agent spawned → expanded notes landed |
| Specialist commits | `b1773fb` first pass; `f93946b` FAQ↔JSON-LD align; `ce7b594` geo-notes sync note |

---

## Round 1 — Decisions (conflict merge)

| Topic | SEO lean | GEO lean | Controller decision |
|-------|----------|----------|---------------------|
| Keyword density in TrustHero | Keywords in meta only; hero trust-first | Plain-language trust; no stuffed meta | **Trust wins in UI.** Keep hero/footer trust-first. Keywords live in title/meta/OG only. |
| Verb triad (kombinieren / zusammenfügen / mergen) | OK in title/description | Prefer natural FAQ headings | **Title/meta OK**; GeoFaq H2 stays “PDFs lokal zusammenfügen — Fakten & FAQ”. |
| `keywords` meta | Low value; optional short list | Don’t stuff | **Omit.** Not in `index.html`. |
| “Online” wording | Allowed with “ohne Upload” | Clarify online ≠ upload | **Keep** in title/OG; FAQ + llms explain. |
| JSON-LD vs CSP | Hash-inject from `src/seo/structuredData.json` | Same; no `unsafe-inline` | **Keep** Vite sha256 inject. **No** `public/structured-data.json` mirror (drift risk; single source only). |
| Static FAQ without JS | Prerender backlog | Prerender backlog | **Ship minimal `<noscript>` facts** now; full body FAQ prerender remains Round 2 / P1. |
| DSGVO casing | Consistent claims | Consistent claims | Normalize UI `dsgvo-freundlich` → **DSGVO-freundlich**. |
| Ranking expectations | Competitive terms are hard | Citeability ≠ blue-link #1 | Documented in Reality check above. |

### Round 1 implemented

- Confirmed single schema source: `src/seo/structuredData.json` only (no public mirror)
- Sitemap includes `lastmod` 2026-10-13
- TrustHero + TrustFooter DSGVO casing (+ specialist commit `727aed8`)
- Minimal `noscript` discoverability block in `index.html`
- Expanded `seo-notes.md` catch-up; keywords meta stays omitted
- This `controller-log.md` with Reality check

### Explicitly deferred (Round 2 / backlog)

- Full static FAQ HTML in initial document (beyond noscript)
- `llms-en.txt` / EN mirror
- Automated sync lint for geoContent ↔ llms ↔ structuredData
- Author `sameAs` in schema
- Search Console verification (non-tracking)

---

## Round 2 — Task-spawn refinement (integrated)

| Agent | Commit | Outcome |
|-------|--------|---------|
| SEO follow-up | `5736267` (+ notes `c710459`) | Verified prod JSON-LD + matching CSP sha256; README discoverability OK; `sameAs` deferred (no GitHub URL in README) |
| GEO follow-up | `f879e7e` | Spot-aligned llms FAQ ↔ GEO_FAQ/FAQPage; EN summary in `llms-full.txt`; expanded `<noscript>` what/why/how/limits |

### Final consistency pass (controller)

- Rebuilt: `dist/index.html` JSON-LD hash still matches CSP; `connect-src 'none'` intact; noscript has Was/Warum/Wie/Grenzen
- Claim guardrails: “DSGVO-zertifiziert” only appears negated; no AggregateRating; no keywords meta; PolyForm NC not labeled OSI Open Source
- CHANGELOG `[Unreleased]` has SEO + GEO bullets; README points at live URL + llms + seo-geo notes
- Brand UI untouched (TrustHero stays trust-first)

### Still backlog (honest)

- Full static FAQ prerender beyond noscript
- Automated sync lint for geoContent ↔ llms ↔ structuredData
- Author `sameAs` / Search Console (non-tracking)
- External links/authority for competitive “merge PDF” rankings (see Reality check)
