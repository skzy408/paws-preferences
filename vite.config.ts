import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/paws-preferences/', // your repo name
  plugins: [react()],
  build: {
    outDir: 'dist', // optional, default is dist
    emptyOutDir: true
  }
});
