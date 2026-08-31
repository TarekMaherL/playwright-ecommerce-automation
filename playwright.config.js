const { defineConfig } = require('@playwright/test');
const { environment } = require('./config/environment');

module.exports = defineConfig({
    testDir: './tests',

    // One isolated test account per worker.
    workers: environment.testAccounts.length,

    // Fail immediately locally.
    // Allow one retry in CI for transient infrastructure failures.
    retries: process.env.CI ? 1 : 0,

    reporter: [
        ['list'],
        [
            'html',
            {
                outputFolder: 'playwright-report',
                open: 'never',
            },
        ],
    ],

    use: {
        baseURL: environment.baseUrl,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: process.env.CI
            ? 'on-first-retry'
            : 'retain-on-failure',
    },

    projects: [
        {
            name: 'api',
            testMatch: '**/api/*.spec.js',
        },

        {
            name: 'auth-chromium',
            testMatch: '**/auth/*.spec.js',
            use: {
                browserName: 'chromium',
            },
        },

        {
            name: 'auth-firefox',
            testMatch: '**/auth/*.spec.js',
            use: {
                browserName: 'firefox',
            },
        },

        {
            name: 'auth-webkit',
            testMatch: '**/auth/*.spec.js',
            use: {
                browserName: 'webkit',
            },
        },

        {
            name: 'chromium',
            testIgnore: [
                '**/auth/*.spec.js',
                '**/api/*.spec.js',
                '**/*.setup.js',
            ],

            use: {
                browserName: 'chromium',
            },
        },

        {
            name: 'firefox',
            testIgnore: [
                '**/auth/*.spec.js',
                '**/api/*.spec.js',
                '**/*.setup.js',
            ],

            use: {
                browserName: 'firefox',
            },
        },

        {
            name: 'webkit',
            testIgnore: [
                '**/auth/*.spec.js',
                '**/api/*.spec.js',
                '**/*.setup.js',
            ],

            use: {
                browserName: 'webkit',
            },
        },
    ],
});