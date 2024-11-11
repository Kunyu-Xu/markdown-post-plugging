import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { copyFileSync, mkdirSync } from 'fs';

// 复制样式文件到 dist
function copyStyles() {
  return {
    name: 'copy-styles',
    closeBundle() {
      const stylesDir = path.resolve(__dirname, 'dist/styles');
      mkdirSync(stylesDir, { recursive: true });
      
      // 复制所有样式文件
      const styles = ['github', 'newspaper', 'poster', 'slim', 'note'];
      styles.forEach(style => {
        copyFileSync(
          path.resolve(__dirname, `src/styles/${style}.css`),
          path.resolve(__dirname, `dist/styles/${style}.css`)
        );
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), copyStyles()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        'popup': path.resolve(__dirname, 'src/popup.tsx'),
        'content-script': path.resolve(__dirname, 'src/content-script.ts')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'output.css';
          }
          return '[name][extname]';
        },
        manualChunks: undefined
      }
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCase'
    }
  }
}); 