import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }), 
       legacy(),
       quasar({
        autoImportComponentCase: 'combined',
        sassVariables: 'src/quasar-variables.sass'
      })
  ],
  server:{
    host: true,
    port: 80,
    cors:true
  },
  preview:{
    host: true,
    port: 80,
    cors:true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
