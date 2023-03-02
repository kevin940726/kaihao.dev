import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, devices } from '@playwright/test';

const host = process.env.HOST || 'http://localhost:3000';

const config = defineConfig({
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['html', { open: 'only-on-failure' }]],
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  testDir: fileURLToPath(new URL('./specs', import.meta.url).href),
  outputDir: path.join(process.cwd(), 'test-results'),
  use: {
    baseURL: host,
    headless: true,
    viewport: {
      width: 960,
      height: 700,
    },
    ignoreHTTPSErrors: true,
    locale: 'en-US',
    contextOptions: {
      reducedMotion: 'reduce',
      // The default is light in most browsers.
      colorScheme: 'light',
      strictSelectors: true,
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: host,
    timeout: 30_000, // 30 seconds.
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      grepInvert: /-chromium/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grepInvert: /-webkit/,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      grepInvert: /-firefox/,
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 5'] },
      grepInvert: /-chromium-mobile/,
    },
  ],
});

export default config;
