/** Ensure filename ends with .pdf */
export function ensurePdfExtension(name: string): string {
  const trimmed = name.trim() || 'combined.pdf'
  return trimmed.toLowerCase().endsWith('.pdf') ? trimmed : `${trimmed}.pdf`
}

/**
 * Save a PDF blob. Uses the File System Access API when available
 * (Chromium), otherwise falls back to a classic download link.
 */
export async function savePdf(blob: Blob, filename: string): Promise<void> {
  const name = ensurePdfExtension(filename)

  const picker = window.showSaveFilePicker
  if (typeof picker === 'function') {
    try {
      const handle = await picker.call(window, {
        suggestedName: name,
        types: [
          {
            description: 'PDF document',
            accept: { 'application/pdf': ['.pdf'] },
          },
        ],
      })
      const writable = await handle.createWritable()
      await writable.write(blob)
      await writable.close()
      return
    } catch (err) {
      // User cancelled the picker — don't fall through to auto-download.
      if (err instanceof DOMException && err.name === 'AbortError') {
        return
      }
      // Unsupported / permission errors → classic download below.
    }
  }

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
