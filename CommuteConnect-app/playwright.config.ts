import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  workers: 1,
  use: {
    baseURL: 'http://localhost:4300',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  reporter: 'list',
});