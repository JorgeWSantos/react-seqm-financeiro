import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  clearScreen: false,
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@auth': path.resolve(__dirname, 'src/auth'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
    },
  },
  server: {
    port: 3000,
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://core-api-portal-seqm-qas.seqm.com.br', // URL da API
  //       changeOrigin: true, // Faz a troca da origem para o destino
  //       rewrite: (path) => path.replace(/^\/api/, '/api/portal'), // Reescreve o caminho
  //       secure: false,
  //     },
  //   },
  // },
});
