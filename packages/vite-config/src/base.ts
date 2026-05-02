import { defineConfig } from 'vite'
import { resolve } from 'path'

export interface ViteConfigOptions {
  root?: string
  base?: string
  resolve?: {
    alias?: Record<string, string>
  }
}

export function createBaseConfig(options: ViteConfigOptions = {}) {
  return defineConfig({
    root: options.root || process.cwd(),
    base: options.base || '/',
    resolve: {
      alias: {
        '@': resolve(options.root || process.cwd(), 'src'),
        ...options.resolve?.alias,
      },
    },
    build: {
      target: 'es2022',
      minify: 'esbuild',
      sourcemap: true,
    },
    css: {
      devSourcemap: true,
    },
  })
}
