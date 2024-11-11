import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup.tsx'),
        'content-script': path.resolve(__dirname, 'src/content-script.ts'),
        'background': path.resolve(__dirname, 'src/background.ts')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'popup') {
            return 'popup.js';
          }
          return '[name].js';
        },
        chunkFileNames: '[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'output.css';
          }
          return '[name][extname]';
        },
      }
    },
    modulePreload: false,
    cssCodeSplit: false,
    minify: false,
    sourcemap: true,
  },
}); 