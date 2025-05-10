// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Stego-Advanced/', // Set base to your repository name
  plugins: [react()],
})
