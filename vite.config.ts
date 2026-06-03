import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Pre-bundle hot dependencies so dev cold-starts don't fan out into
  // dozens of individual ESM module requests (especially lucide icons).
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'lucide-react',
      'canvas-confetti',
    ],
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
