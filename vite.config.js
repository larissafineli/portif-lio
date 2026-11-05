import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: funciona na raiz (Vercel) e em subpasta (GitHub Pages).
export default defineConfig({
  plugins: [react()],
  base: './',
});
