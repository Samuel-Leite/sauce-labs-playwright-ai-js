const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();
const browserConfig = require('./helpers/browsers');

const browserName = process.env.BROWSER || 'chromium';
const deviceName = process.env.DEVICE || 'Desktop Chrome';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect:{
    timeout: 5000
  },
  fullyParallel: false,
  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['allure-playwright']],
  use: {
    browserName: browserConfig.getBrowser(browserName),
    ...browserConfig.getDeviceConfig(deviceName),
    headless: true,
    trace: 'on-first-retry',
  },
});
