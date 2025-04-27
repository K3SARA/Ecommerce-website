import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Ecommerce-website/',  // 👈 important! your repo name here
  plugins: [react()],
})
