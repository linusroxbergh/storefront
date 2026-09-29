/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    // payments-api runs on :8787 in dev
    proxy: { '/api': { target: 'http://localhost:8787', rewrite: (path) => path.replace(/^\/api/, '') } },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
