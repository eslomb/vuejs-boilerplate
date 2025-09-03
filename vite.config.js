import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // define: {
  //   'process.env': {}, // Or specific process variables if needed
  //   'Buffer': 'buffer',
  // },
  base: '',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  build: {
    outDir: path.resolve(__dirname, './dist'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        // chunkFileNames: `assets/[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
})
