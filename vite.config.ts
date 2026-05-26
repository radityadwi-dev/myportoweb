import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        posDocumentation: resolve(__dirname, 'pos-documentation.html'),
      },
    },
  },
})
