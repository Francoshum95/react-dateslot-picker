import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/main.tsx",
      formats: ["es"],
      name: "UiLib"
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          React: "react"
        }
      }
    }
  },
  plugins: [react(), dts()]
})
