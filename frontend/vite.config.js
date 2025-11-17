import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Define a porta do frontend
    proxy: {
      '/api': { // Qualquer requisição para /api...
        target: 'http://localhost:3333', // ...será redirecionada para cá.
        changeOrigin: true, // Necessário para o redirecionamento funcionar
      }
    }
  }
})