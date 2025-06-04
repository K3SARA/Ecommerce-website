import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'; // Import the 'path' module

export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/Ecommerce-website/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Add this alias configuration
      },
    },
  };
});
