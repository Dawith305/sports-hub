/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_THESPORTSDB_API_BASE: string
  readonly VITE_DEFAULT_LEAGUE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
