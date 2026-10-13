# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- SEO first pass: keyword title/description, canonical, hreflang, Open Graph/Twitter, `og-image.png`, `robots.txt`, `sitemap.xml`, FAQPage/WebApplication JSON-LD (CSP-hashed inject), notes in `docs/seo-geo/seo-notes.md`
- GEO first pass: `public/llms.txt` + `llms-full.txt`, on-page facts/FAQ (`GeoFaq` + `geoContent.ts`), notes in `docs/seo-geo/geo-notes.md`
- JS-off `<noscript>` summary in `index.html` (entity, privacy, limits, llms links)
- GEO Round 2: concise English summary section in `llms-full.txt` for EN-first assistants (DE remains primary)

### Changed

- `html lang="de"`; trust hero + FAQ copy tuned for kombinieren/mergen/ohne Upload while keeping PolyForm NC and privacy guardrails
- Trust copy capitalizes **DSGVO-freundlich**; SEO notes document catch-up backlog and CSP/schema ops
- Controller SEO/GEO loop decisions + reality check in `docs/seo-geo/controller-log.md` (trust UI over stuffing; no dual schema mirror)
- Round 2 SEO follow-up: verified production JSON-LD inject + matching CSP sha256; README discoverability links confirmed; author `sameAs` deferred (no GitHub URL in README); notes in `docs/seo-geo/seo-notes.md`
- GEO Round 2: expanded `<noscript>` what/why/how/limits; `geo-notes.md` Round 2 follow-up subsection

### Fixed

- GEO Round 2: spot-aligned `llms-full.txt` FAQ claims with `geoContent.ts` / FAQPage (shared Q&As)

## [1.0.0] - 2026-10-13

First public baseline for **PDF Kombinierer** — a client-only PDF combiner SPA (source-available under PolyForm Noncommercial 1.0.0).

### Added

- Client-only PDF merge workflow with pdf-lib (no server upload or processing)
- Drag-and-drop anywhere, multi-file and folder pick, sortable gallery tiles
- Page expand (“Show pages”) with lazy previews and page-level reorder
- Bulk select (click / Shift / Cmd-Ctrl), keyboard shortcuts, remove selection
- Local prefs (last save name in `localStorage`; Chromium Save As folder when available)
- Progress feedback for open, previews, combine, and save
- Clear warnings for password-protected or damaged PDFs
- German trust/privacy hero and footer (DSGVO-freundlich, no AI upload); English tool UI
- Brand UI aligned with michaelmacher.at (colors, Montserrat / Playfair Display)
- Production CSP that blocks page network APIs; bundled PDF.js worker (no CDN)
- Coolify / Nixpacks static deploy notes; Vite 6 pin for reliable builds
- PolyForm Noncommercial 1.0.0 license (source-available, noncommercial)

### Changed

- Product naming and copy evolved to **PDF Kombinierer** (von Michael Macher) with plain-language privacy messaging

[Unreleased]: https://github.com/michaelmkr/app-pdfcombine-js/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/michaelmkr/app-pdfcombine-js/releases/tag/v1.0.0
