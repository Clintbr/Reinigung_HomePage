import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kontakt: resolve(__dirname, 'kontakt.html'),
        dienste: resolve(__dirname, 'dienste.html'),
        galerie: resolve(__dirname, 'galerie.html'),
        impressum: resolve(__dirname, 'impressum.html'),
        agb: resolve(__dirname, 'agb.html'),
        datenschutz: resolve(__dirname, 'datenschutz.html'),
      },
    },
  },
});
