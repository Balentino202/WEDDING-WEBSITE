import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// On static hosts like GitHub Pages, a direct visit to /admin (or any non-root
// path) returns the 404 page. Copying index.html → 404.html makes the host serve
// the app for those paths, so client-side routing (e.g. /admin) keeps working
// even on hard refresh or shared links.
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      const index = resolve(dist, 'index.html')
      if (existsSync(index)) copyFileSync(index, resolve(dist, '404.html'))
    },
  }
}

// https://vitejs.dev/config/
// `base` is set so the build works when hosted under a sub-path
// (e.g. GitHub Pages: https://<user>.github.io/WEDDING-WEBSITE/).
// Change it to '/' if you deploy at a domain root.
export default defineConfig({
  base: './',
  plugins: [react(), spaFallback()],
})
