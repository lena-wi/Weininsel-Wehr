import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
    plugins: [
        react(),
        viteCompression({ algorithm: 'brotliCompress' }), // For compression
    ],
    build: {
        assetsDir: 'assets',
        sourcemap: false, // Disable source maps in production to reduce bundle size
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Create a separate chunk for vendor files
                        return 'vendor'
                    }
                },
            },
        },
        chunkSizeWarningLimit: 500, // Show warnings for large chunks
        target: 'es2015', // Use modern syntax for modern browsers
        minify: 'terser', // Default minifier for Vite
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.log in production
            },
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss(), autoprefixer()],
        },
    },
    optimizeDeps: {
        include: ['react', 'react-dom'], // Pre-bundle common dependencies
    },
    server: {
        hmr: {
            overlay: false, // Disable full-page reload on errors in development
        },
    },
})
