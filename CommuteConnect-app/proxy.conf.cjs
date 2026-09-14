const { existsSync } = require('node:fs');
const { join } = require('node:path');

const envPath = join(__dirname, '.env');

if (existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const target = new URL(process.env.API_PROXY_TARGET || 'http://localhost:3000');

if (!['http:', 'https:'].includes(target.protocol)) {
  throw new Error('API_PROXY_TARGET must be an HTTP or HTTPS URL.');
}

module.exports = {
  '/socket.io': {
    target: target.origin,
    secure: true,
    changeOrigin: false,
    ws: true,
  },
  '/api': {
    target: target.origin,
    secure: true,
    changeOrigin: false,
    ws: true,
  },
};