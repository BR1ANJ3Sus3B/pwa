import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}/` : '/'

export default defineConfig({
  // GitHub project pages are served from /<repository-name>/.
  // Local development and custom domains continue to use the site root.
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg'],
      workbox: {
        // Cache all generated assets, including React and Vite SVG logos.
        // This makes them available after the application has been visited once.
        navigateFallback: `${base}index.html`,
        globPatterns: ['**/*.{js,css,html,png,svg,ico,jpeg}'],
        // Avoid loading a separate Workbox script when the device is offline.
        inlineWorkboxRuntime: true,
      },
      manifest: {
        name: 'PWA Brian',
        short_name: 'PWA Brian',
        description: 'My Awesome App description',
        start_url: base,
        scope: base,
        display: 'standalone',
        background_color: '#f50808',
        theme_color: '#ffffff',
       icons: [
          {
            src: `${base}screenshots/angry%20cat.jpeg`,
            sizes: '720x720',
            type: 'image/jpeg'
          },
          {
            src: `${base}screenshots/perrito.jpeg`,
            sizes: '736x736',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ]
})
  
