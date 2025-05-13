import path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';


export default defineConfig(({ command }) => {
    const isBuild = command === 'build';
    const srcPath = path.resolve(__dirname, 'src');

    const alias = {
        '@': srcPath
    }

    return {
        plugins: [
            react(),
            splitVendorChunkPlugin(),
            isBuild && visualizer({
                filename: 'analyse_bundle.html'
            })
        ],
        css: {
            postcss: {
                plugins: [
                    autoprefixer()
                ]
            },
            modules: {
                generateScopedName: isBuild ? '[hash:base64:6]' : '[name]_[local]_[hash:base64:2]'
            },
        },
        resolve: {
            alias
        },
        build: {
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                output: {
                    entryFileNames: 'assets/[hash].js',
                    chunkFileNames: 'assets/[hash].js',
                    assetFileNames: 'assets/[hash].[ext]'
                }
            }
        }
    }
})
