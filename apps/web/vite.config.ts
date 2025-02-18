import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Auto-update service worker
      manifest: {
        name: 'IIT Dhanbad Alumni',
        short_name: 'IIT Dhanbad Alumni',
        theme_color: '#5048e5',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa/pwa-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/pwa/pwa-72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/pwa/pwa-96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/pwa/pwa-144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/pwa/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
      devOptions: {
        enabled: process.env.NODE_ENV === 'development',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/alumni-ism/' : '/',
});
