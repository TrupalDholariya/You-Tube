import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    proxy: {
      // '/api/v1' : 'https://youtube-backend-psi.vercel.app'
      // "/api/v1" : "https://youtube-backend-psi.vercel.app"
    },
  },
  plugins: [react()],
});
