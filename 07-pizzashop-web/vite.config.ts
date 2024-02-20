import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'happy-dom',
  },
} as UserConfig & {
  test: InlineConfig;
});
