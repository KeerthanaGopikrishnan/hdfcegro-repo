import { defineConfig,devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  expect: {
    timeout: 5000 // Timeout for expect assertions
  },
  fullyParallel: true,
  retries: 0, // No retries unless you want them
  reporter: [['allure-playwright']],
  timeout:0, // You can remove allure if not needed
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
},

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        permissions: [], // 🚫 Block all permissions including notifications
      },
      workers: 4,
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});