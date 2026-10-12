import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** Production-only CSP: block all fetch/XHR/WebSocket so PDFs cannot be uploaded. */
function privacyCsp(): Plugin {
  const content = [
    "default-src 'self'",
    "script-src 'self' 'wasm-unsafe-eval'",
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
      // Skip in `vite` dev server so HMR websockets keep working.
      if (ctx.server) return html
      return html.replace(
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
