import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['logo.svg', 'robots.txt'],
      manifest: {
        name: 'ToDo App',
        short_name: 'ToDo',
        description: "Your app for don't forget nothing.",
        theme_color: '#1a1a1a',
        icons: [
          {
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
