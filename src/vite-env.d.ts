/// <reference types="vite/client" />

declare module '*?worker' {
  const workerConstructor: {
    new (): Worker
  }
  export default workerConstructor
}

type WellKnownDirectory =
  | 'desktop'
  | 'documents'
  | 'downloads'
  | 'music'
  | 'pictures'
  | 'videos'

interface Window {
  showSaveFilePicker?: (options?: {
    suggestedName?: string
    startIn?: WellKnownDirectory | FileSystemHandle
    types?: Array<{
      description?: string
      accept: Record<string, string[]>
    }>
  }) => Promise<FileSystemFileHandle>
}

interface FileSystemHandle {
  readonly kind: 'file' | 'directory'
  readonly name: string
  queryPermission?: (descriptor?: {
    mode?: 'read' | 'readwrite'
  }) => Promise<PermissionState>
  requestPermission?: (descriptor?: {
    mode?: 'read' | 'readwrite'
  }) => Promise<PermissionState>
}

interface FileSystemFileHandle extends FileSystemHandle {
  readonly kind: 'file'
  createWritable(): Promise<FileSystemWritableFileStream>
  getParent?: () => Promise<FileSystemDirectoryHandle>
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  readonly kind: 'directory'
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: Blob | BufferSource | string): Promise<void>
  close(): Promise<void>
}
