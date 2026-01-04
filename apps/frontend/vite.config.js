import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow connections from outside the container
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // Required for hot reload in Docker on Windows
      interval: 100, // Check for changes every 100ms
    },
    hmr: {
      host: 'localhost', // HMR host
      port: 5173,
    },
  },
})
