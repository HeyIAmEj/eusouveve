import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'vflowgenerator.js',
        chunkFileNames: 'vflowgenerator.js',
        assetFileNames: 'vflowgenerator.css',
      },
    },
  }
})
