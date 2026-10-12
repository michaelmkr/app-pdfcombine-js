# Local PDF Combiner

Merge multiple PDF files into one document — entirely in your browser. Your files are never uploaded; all processing happens on your device.

**Live app:** [http://combinepdf.makertechnologies.at/](http://combinepdf.makertechnologies.at/)

## Privacy & security

- **No uploads.** PDFs are read and merged in the browser only. There is no upload API and no server-side PDF processing.
- **Client-side libraries.** Merging uses [pdf-lib](https://pdf-lib.js.org/); first-page thumbnails use [PDF.js](https://mozilla.github.io/pdf.js/).
- **Static hosting.** A deployed instance only serves HTML, CSS, and JavaScript. Closing the tab clears in-memory file data.

## How to use

1. Open [https://combinepdf.makertechnologies.at/](http://combinepdf.makertechnologies.at/) (or run the app locally — see below).
2. Drop PDFs anywhere on the page, or use **Choose files** / **Choose folder**.
3. Drag tiles in the gallery to set merge order. Remove individual files or clear the list as needed.
4. Optionally set an output filename, then merge and download (or use Save As where the browser supports it).

## Features

- **Drop anywhere** — drag PDFs onto the page (full-window drop target)
- **Gallery reorder** — drag-and-drop tiles to control page order in the merged file
- **Thumbnails** — first-page previews for each document
- **Download / Save As** — File System Access API when available; otherwise a classic download
- Multi-file and folder selection (folder pick where the browser supports it)
- Skip encrypted or unreadable PDFs without aborting the rest of the batch

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

This app is a **static SPA**. Prefer Coolify’s **static site** mode so Caddy serves `dist/` (no Node process at runtime).

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
