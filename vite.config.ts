import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import svgLoaderPlugin from './src/config/vitePlugins/svgLoader'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: 'esnext'
    },
    esbuild: {
        target: 'esnext',
    },
    plugins: [
        svgLoaderPlugin({
            svgo: true,
            svgoConfig: {
                multipass: true,
                js2svg: {
                    indent: 2,
                    pretty: true,
                },
                plugins: [
                    {
                        name: 'removeAttrs',
                        params: {
                            attrs: ['fill', 'stroke', 'opacity', 'fill-opacity']
                        },
                    },
                ],
            }
        }),
        vueJsxPlugin(),
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
            '@src': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
