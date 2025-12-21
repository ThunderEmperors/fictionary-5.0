import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
   headers: {
<<<<<<< HEAD
      "Cross-Origin-Embedder-Policy": "unsafe-none",
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
=======
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
>>>>>>> ishita2
    },
  },
  build: {
    outDir: 'dist', // Vercel expects the build to be in the 'dist' folder
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
