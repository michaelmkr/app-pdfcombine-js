const FILENAME_KEY = 'pdfcombiner:lastFilename'
const IDB_NAME = 'pdfcombiner-prefs'
const IDB_STORE = 'kv'
const DIR_HANDLE_KEY = 'lastSaveDirHandle'
const FILE_HANDLE_KEY = 'lastSaveFileHandle'

/** Read last output filename from localStorage (defaults to combined.pdf). */
export function getLastFilename(): string {
  try {
    const value = localStorage.getItem(FILENAME_KEY)
    if (value && value.trim()) return value
  } catch {
    // private mode / blocked storage
  }
  return 'combined.pdf'
}

/** Persist last successful output filename. */
export function setLastFilename(name: string): void {
  try {
    localStorage.setItem(FILENAME_KEY, name)
  } catch {
    // ignore quota / private mode
  }
}

function openPrefsDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1)
    req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'))
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE)
      }
    }
    req.onsuccess = () => resolve(req.result)
  })
}

async function idbGet<T>(key: string): Promise<T | undefined> {
  try {
    const db = await openPrefsDb()
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly')
      const store = tx.objectStore(IDB_STORE)
      const req = store.get(key)
      req.onerror = () => reject(req.error)
      req.onsuccess = () => resolve(req.result as T | undefined)
      tx.oncomplete = () => db.close()
    })
  } catch {
    return undefined
  }
}

async function idbSet(key: string, value: unknown): Promise<void> {
  try {
    const db = await openPrefsDb()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite')
      const store = tx.objectStore(IDB_STORE)
      const req = store.put(value, key)
      req.onerror = () => reject(req.error)
      req.onsuccess = () => resolve()
      tx.oncomplete = () => db.close()
    })
  } catch {
    // ignore — prefs are best-effort
  }
}

/** Chromium: last save folder (or file handle used as startIn). */
export async function getSaveStartInHandle(): Promise<FileSystemHandle | undefined> {
  const dir = await idbGet<FileSystemDirectoryHandle>(DIR_HANDLE_KEY)
  if (dir) {
    const ok = await ensureHandlePermission(dir)
    if (ok) return dir
  }
  const file = await idbGet<FileSystemFileHandle>(FILE_HANDLE_KEY)
  if (file) {
    const ok = await ensureHandlePermission(file)
    if (ok) return file
  }
  return undefined
}

export async function storeSaveHandles(
  fileHandle: FileSystemFileHandle,
): Promise<void> {
  await idbSet(FILE_HANDLE_KEY, fileHandle)
  // Prefer a real directory handle when the browser exposes getParent().
  const withParent = fileHandle as FileSystemFileHandle & {
    getParent?: () => Promise<FileSystemDirectoryHandle>
  }
  if (typeof withParent.getParent === 'function') {
    try {
      const parent = await withParent.getParent()
      await idbSet(DIR_HANDLE_KEY, parent)
    } catch {
      // keep file handle only
    }
  }
}

async function ensureHandlePermission(
  handle: FileSystemHandle,
): Promise<boolean> {
  const permissive = handle as FileSystemHandle & {
    queryPermission?: (desc?: { mode?: 'read' | 'readwrite' }) => Promise<PermissionState>
    requestPermission?: (desc?: { mode?: 'read' | 'readwrite' }) => Promise<PermissionState>
  }
  try {
    if (typeof permissive.queryPermission === 'function') {
      let state = await permissive.queryPermission({ mode: 'readwrite' })
      if (state === 'granted') return true
      if (state === 'prompt' && typeof permissive.requestPermission === 'function') {
        state = await permissive.requestPermission({ mode: 'readwrite' })
        return state === 'granted'
      }
      return false
    }
  } catch {
    return false
  }
  // No permission API — try using the handle anyway.
  return true
}
