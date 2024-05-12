/*
 * @Author: kasuie
 * @Date: 2024-05-06 14:27:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-07 15:34:14
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx(), monacoEditorPlugin({})],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://8.137.146.125:5601',
        changeOrigin: true
      },
      '/spi': {
        target: 'http://8.137.146.125:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/spi/, '')
      }
    },
    hmr: true
  }
})
