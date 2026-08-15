const { defineConfig } = require('@playwright/test');
const { environment } = require('./config/environment');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    baseURL: environment.baseUrl,
    browserName: 'chromium',
  },
});