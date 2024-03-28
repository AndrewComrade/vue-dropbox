import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgLoader(),
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
        },
    },
})
