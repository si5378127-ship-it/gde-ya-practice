import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — чтобы сборку можно было положить в любую папку на хостинге
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
