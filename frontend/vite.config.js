import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Set this to your base path if you're deploying to a subdirectory
  build: {
    outDir: 'dist', // Make sure the output folder is correct
  },
  server: {
    // Enable single-page app fallback routing for direct access to routes
    historyApiFallback: true,
  },
})
