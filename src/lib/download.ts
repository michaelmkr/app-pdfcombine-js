import { getSaveStartInHandle, storeSaveHandles } from './prefs'

/** Ensure filename ends with .pdf */
export function ensurePdfExtension(name: string): string {
  const trimmed = name.trim() || 'combined.pdf'
  return trimmed.toLowerCase().endsWith('.pdf') ? trimmed : `${trimmed}.pdf`
}

/**
 * Save a PDF blob. Uses the File System Access API when available
 * (Chromium), otherwise falls back to a classic download link.
 * Returns true if a file was written/downloaded, false if the user cancelled.
 */
export async function savePdf(
  blob: Blob,
  filename: string,
  options?: { pdfDescription?: string },
): Promise<boolean> {
  const name = ensurePdfExtension(filename)
  const pdfDescription = options?.pdfDescription ?? 'PDF document'

  const picker = window.showSaveFilePicker
  if (typeof picker === 'function') {
    try {
      const startIn = await getSaveStartInHandle()
      const handle = await picker.call(window, {
        suggestedName: name,
        ...(startIn ? { startIn } : {}),
        types: [
          {
            description: pdfDescription,
            accept: { 'application/pdf': ['.pdf'] },
          },
        ],
      })
      const writable = await handle.createWritable()
      await writable.write(blob)
      await writable.close()
      await storeSaveHandles(handle)
      return true
    } catch (err) {
      // User cancelled the picker — don't fall through to auto-download.
      if (err instanceof DOMException && err.name === 'AbortError') {
        return false
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
  return true
}
