import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const rootDir = dirname(fileURLToPath(import.meta.url))
const structuredData = readFileSync(
  join(rootDir, 'src/seo/structuredData.json'),
  'utf8',
).trim()

/** CSP hashes script *contents* only (not the tags). */
function sha256Source(body: string): string {
  return `'sha256-${createHash('sha256').update(body).digest('base64')}'`
}

const jsonLdHashSource = sha256Source(structuredData)
const structuredDataScript = `<script type="application/ld+json">${structuredData}</script>`

/** Production-only CSP: block all fetch/XHR/WebSocket so PDFs cannot be uploaded. */
function privacyCsp(): Plugin {
  const content = [
    "default-src 'self'",
    `script-src 'self' 'wasm-unsafe-eval' ${jsonLdHashSource}`,
    "worker-src 'self' blob:",
    "connect-src 'none'",
    "img-src 'self' blob: data:",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
  ].join('; ')

  return {
    name: 'privacy-csp',
    transformIndexHtml(html, ctx) {
      let next = html
      if (!next.includes('application/ld+json')) {
        next = next.replace(
          /<\/head>/i,
          `    ${structuredDataScript}\n  </head>`,
        )
      }
      // Skip CSP meta in `vite` dev server so HMR websockets keep working.
      if (ctx.server) return next
      return next.replace(
        /<head>/i,
        `<head>\n    <meta http-equiv="Content-Security-Policy" content="${content}" />`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), privacyCsp()],
  worker: {
    format: 'es',
  },
})
