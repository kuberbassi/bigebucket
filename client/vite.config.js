import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // *** THE CRITICAL FIX: Set base to '/' ***
  // This ensures all built assets (JS, CSS, images) are loaded from the domain root
  // (e.g., https://bigebucket.com/assets/index.js) which prevents the blank screen.
  base: '/', 
  
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // This proxy is only used for local development, 
        // but we'll keep it here for completeness.
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/ccav': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})