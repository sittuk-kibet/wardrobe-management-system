import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'resources/js'), // Adjust this line to your project
      },
    },
    build: {
      outDir: path.resolve(__dirname, 'public/build'), // Ensure built files go to the public directory
    },
  });
