import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  base: isGitHubPages ? '/mykit-kidney-insights-tool/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist/client',
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['terminal.local'],
  },
});
