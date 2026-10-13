# PDF Kombinierer

**PDF Kombinierer** von [Michael Macher](https://michaelmacher.com/) — combine several PDFs into one file on your computer. Your documents are never uploaded. Other online tools send your files to their servers (sometimes including AI processing); this one does not.

**Live app:** [https://combinepdf.makertechnologies.at/](https://combinepdf.makertechnologies.at/)  
**Source:** [github.com/michaelmkr/app-pdfcombine-js](https://github.com/michaelmkr/app-pdfcombine-js)  
**Impressum:** [michaelmacher.com/imprint](https://michaelmacher.com/imprint)

**For AI assistants:** [llms.txt](https://combinepdf.makertechnologies.at/llms.txt) · [llms-full.txt](https://combinepdf.makertechnologies.at/llms-full.txt) · [GEO notes](docs/seo-geo/geo-notes.md) · [SEO notes](docs/seo-geo/seo-notes.md)

**Language:** Full UI i18n (German / English) with a header language switcher. Preference is stored in `localStorage` (`pdf-kombinierer-locale`); default follows the browser language (`de*` → German, otherwise English, fallback German).

**Versioning:** See [CHANGELOG.md](CHANGELOG.md) for release history and [RELEASING.md](RELEASING.md) for how to cut a version. GitHub Releases track tagged versions (`vX.Y.Z`).

## Privacy & security

- **No uploads.** PDFs are opened and combined only on your device. Nothing is sent to a server for processing.
- **DSGVO / GDPR-freundlich.** Your files stay on your computer — no cloud processing, no data handed to our servers. Suitable for sensitive or personal documents. (Not a certification claim — just how the tool works.)
- **No AI upload / kein KI-Upload.** Merging runs in the browser only. There is no AI cloud processing of your PDFs. This is not an AI system and does not claim AI Act certification.
- **Libraries stay with the app.** Combining uses [pdf-lib](https://pdf-lib.js.org/); previews use [PDF.js](https://mozilla.github.io/pdf.js/) with a bundled worker (no third-party CDN).
- **Extra protection in production.** The built app blocks network requests from the page, so your files cannot be uploaded even by accident.
- **Simple hosting.** A deployed instance only serves the website files (HTML, CSS, JavaScript). Closing the tab clears the PDFs from memory.
- **Local prefs only.** Last save name lives in `localStorage`; Chromium may remember the last save folder via IndexedDB. Nothing is sent to a server.

### About the browser Network tab

After you add PDFs you may see many entries. That is **not** your PDFs leaving the device:

| What you see | What it actually is |
|--------------|---------------------|
| `blob:https://…` (JPEG, ~0 kB) | Local preview images kept in memory on your computer — not an upload. |
| `pdf.worker…` (often 304 / cached) | The app’s own helper script from the host, not your document bytes. |
| Chrome extension scripts | Browser extensions — unrelated to this app. |

The only normal network use is **downloading the app** (HTML/JS/CSS) when you open the site. Your PDF bytes never leave your computer.

## How to use

1. Open [https://combinepdf.makertechnologies.at/](https://combinepdf.makertechnologies.at/) (or run the app locally — see below).
2. Drop PDFs anywhere on the page, or use **Choose files** / **Choose folder**.
3. Drag tiles to set the order. Use **Show pages** to reorder or drop individual pages. Multi-select with click / Shift / Cmd-Ctrl; Delete removes the selection.
4. Optionally set a save name (remembered on this computer), then **Merge PDFs** (or use Save As where the browser supports it).

## Features

- **Drop anywhere** — drag PDFs onto the page
- **Gallery** — thumbnail tiles you can reorder freely (whole files or single pages)
- **Show pages** — expand a file into sortable page tiles with lazy previews
- **Bulk select** — Shift/Cmd-Ctrl selection, keyboard shortcuts, remove selected
- **Remember prefs** — last filename; Chromium Save As folder when permitted
- **Clear feedback** — progress for open / previews / combine / save; clear warnings for damaged or password-protected files
- **Known limit** — encrypted / password-protected PDFs cannot be opened or merged (they are skipped)
- **Brand UI** — colors and typography from the michaelmacher.at brand (Montserrat / Playfair Display)
- **Download / Save As** — save picker when the browser supports it; otherwise a normal download
- Multi-file and folder selection (folder pick where the browser supports it)

## Run locally

Requires Node.js 18+ (22 recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build   # production build → dist/
npm start       # serve dist/ (PORT defaults to 3000)
```

Optional: `npm run preview` to preview the production build with Vite.

## Deploy (Coolify / Nixpacks)

This app is a **static website** (no server-side PDF work). Prefer Coolify’s **static site** mode so Caddy serves `dist/` (no Node process at runtime).

Suggested Coolify settings:

| Setting | Value |
|---------|--------|
| Build Pack | Nixpacks |
| Is it a static site? | Yes |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Start Command | *(leave empty for static)* |
| Publish Directory | `dist` |
| Ports Exposes | *(Coolify static default; often unused)* |

If you deploy as a Node app instead (non-static), use Start Command `npm start` and port `3000`. That only serves static files from `dist/`; PDFs are never processed on the server.

`nixpacks.toml` in the repo documents the same build/start flow.

## License

This project's **own source code** is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE) (`PolyForm-Noncommercial-1.0.0`).

**You may:** view, fork, study, modify, and use the code for personal, educational, research, hobby, and other noncommercial purposes (including use by many noncommercial organizations — see the license).

**You may not:** use this project's code for commercial purposes under this license.

This is **source-available**, not [OSI Open Source](https://opensource.org/osd): OSI Open Source requires allowing commercial use. A noncommercial-only license intentionally does not meet that definition.

### Third-party dependencies

Dependencies keep their **own** licenses. This LICENSE does **not** relicense React, pdf-lib, PDF.js, dnd-kit, Vite, fonts, or other packages. Notable direct dependencies:

| Package | License |
|---------|---------|
| react, react-dom, pdf-lib, @dnd-kit/*, serve, vite, oxlint, … | MIT |
| pdfjs-dist (PDF.js), typescript | Apache-2.0 |
| @fontsource/montserrat, @fontsource/playfair-display | OFL-1.1 |

When you redistribute a build that includes those libraries, retain their copyright and license notices as their licenses require.
