import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:8080',
        ws: true
      }
    }
  }
})
