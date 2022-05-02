import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:4000',
        ws: true
      }
    }
  }
})
