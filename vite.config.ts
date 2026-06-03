import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// `base` is set so the build works when hosted under a sub-path
// (e.g. GitHub Pages: https://<user>.github.io/Purity-Isaiah-wedding/).
// Change it to '/' if you deploy at a domain root.
export default defineConfig({
  base: './',
  plugins: [react()],
})
