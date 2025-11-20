import { defineConfig } from 'vite';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/wisdoms/',
  root: 'src',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  plugins: [
    {
      name: 'add-nojekyll',
      closeBundle() {
        writeFileSync(resolve(__dirname, 'dist', '.nojekyll'), '');
      },
    },
  ],
});
