import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/magic8bowl/',
  server: {
    host: 'localhost',
    port: 3000
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Force new hashes to bust GitHub Pages cache
        entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        assetFileNames: `assets/[name]-[hash]-${Date.now()}.[ext]`
      }
    }
  }
})