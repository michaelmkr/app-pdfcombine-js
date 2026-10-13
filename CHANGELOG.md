# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

## [1.0.0] - 2026-10-13

First public baseline for **PDF Kombinierer** — a client-only PDF combiner SPA (source-available under PolyForm Noncommercial 1.0.0).

### Added

- Client-only PDF merge workflow with pdf-lib (no server upload or processing)
- Drag-and-drop anywhere, multi-file and folder pick, sortable gallery tiles
- Page expand (“Show pages”) with lazy previews and page-level reorder
- Bulk select (click / Shift / Cmd-Ctrl), keyboard shortcuts, remove selection
- Local prefs (last save name and locale in `localStorage`; Chromium Save As folder when available)
- Progress feedback for open, previews, combine, and save
- Clear warnings for password-protected or damaged PDFs
- Full DE/EN i18n: lightweight dicts, React locale context, brand-styled header switcher; browser `de*` → DE else EN; `document.documentElement.lang` and client meta update with locale
- Brand UI aligned with michaelmacher.at (colors, Montserrat / Playfair Display)
- Production CSP that blocks page network APIs; bundled PDF.js worker (no CDN)
- SEO: keyword title/description, canonical, hreflang (`de` + `x-default`), Open Graph/Twitter, `og-image.png`, `robots.txt`, `sitemap.xml`, bilingual FAQPage/WebApplication JSON-LD (CSP-hashed inject)
- GEO: `public/llms.txt` + `llms-full.txt` (DE+EN facts/FAQ), on-page facts/FAQ (`GeoFaq` + `geoContent.ts`), bilingual `<noscript>` summary
- Coolify / Nixpacks static deploy notes; Vite 6 pin for reliable builds
- PolyForm Noncommercial 1.0.0 license (source-available, noncommercial)
- Docs: `docs/seo-geo/` notes and controller log; RELEASING.md for manual releases

### Changed

- Product naming and copy evolved to **PDF Kombinierer** (von Michael Macher) with plain-language privacy messaging (DSGVO-freundlich / GDPR-friendly by design, not certified)
- Single-URL SPA: DE HTML shell primary; no separate EN landing page / no same-URL `hreflang="en"`

### Fixed

- Full UI switches DE ↔ EN together (trust, gallery, merge bar, errors, FAQ/GEO) — no mixed-language chrome
- SEO/GEO and `llms*.txt` aligned with bilingual UI and shared FAQ claims
- UTF-8 `Content-Type` charset for `.txt`/`.xml` in Vite preview and production `serve` (`serve.json`) so `llms*.txt` does not mojibake

[Unreleased]: https://github.com/michaelmkr/app-pdfcombine-js/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/michaelmkr/app-pdfcombine-js/releases/tag/v1.0.0
