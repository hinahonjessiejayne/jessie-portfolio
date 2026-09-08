import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const PROJECTS_FILE = fileURLToPath(new URL('./src/data/projects.json', import.meta.url));

/**
 * Publishes `src/data/projects.json` as `/portfolio.json` so the AI portfolio
 * (ai.jessiecalm.com) reads the same project list this site renders. One file,
 * two sites. Served from memory in dev, emitted as a build asset in production.
 */
const portfolioJson = (): Plugin => {
  const body = () => {
    const data = JSON.parse(readFileSync(PROJECTS_FILE, 'utf8')) as Record<string, unknown>;
    return JSON.stringify({ site: 'https://www.jessiecalm.com', ...data });
  };
  return {
    name: 'portfolio-json',
    configureServer(server) {
      server.middlewares.use('/portfolio.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(body());
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'portfolio.json', source: body() });
    },
  };
};

export default defineConfig({
  plugins: [react(), portfolioJson()],
  server: {
    port: 5173,
    open: true,
  },
});
