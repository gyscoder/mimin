import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '1cc0-179-125-215-78.ngrok-free.app'
    ]
  }
})