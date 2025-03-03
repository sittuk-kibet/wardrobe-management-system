import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  root: 'wardrobe-management-backend',  // Set the root to your backend directory
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: '../dist',  // Adjust if necessary
  },
  server: {
    historyApiFallback: true, // This ensures that all routes are served by index.html
    open: true,  // Automatically open the browser when the dev server starts
  },
});
