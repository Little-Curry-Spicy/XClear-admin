/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_USE_MENU_API?: string
  readonly VITE_SYSTEM_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.lottie?url' {
  const url: string
  export default url
}
