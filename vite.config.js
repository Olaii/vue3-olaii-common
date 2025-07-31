import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import fs from "fs";

let key = null;
let cert = null;

try {
  key = fs.readFileSync("../test.olaii.com-key.pem");
  cert = fs.readFileSync("../test.olaii.com.pem");
} catch (e) {
  console.error(e);
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: "common",
  server: {
    port: 9100,
    host: "test.olaii.com",
    https: {
      key,
      cert,
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/lib.js',
      name: 'Vue3OlaiiCommon',
      fileName: (format) => `vue3-olaii-common.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'vue3-gettext', 'vue-router'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          "vue-router": 'vueRouter',
        },
      },
    },
  }
})
