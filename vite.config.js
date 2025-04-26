import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',  // Usa '/' para rutas absolutas
  build: {
    outDir: 'dist',  // Directorio de salida
  }
});