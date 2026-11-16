import { defineConfig } from 'vite'

export default defineConfig({
  // Folder that contains index.html (the project root)
  root: '.',
  // Public path the built files are loaded from; './' makes the links relative
  // so the dist folder works from any location (e.g. GitHub Pages sub-folder)
  base: './',
  build: {
    // Folder where `npm run build` writes the production files
    outDir: 'dist',
  },
})
