/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_GA_MEASUREMENT_ID: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  export const frontmatter: Record<string, unknown>
  export default function MDXContent(props: MDXProps): JSX.Element
}
