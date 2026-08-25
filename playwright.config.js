const path = require('path');
const { defineConfig } = require('@playwright/test');
const { environment } = require('./config/environment');

const authFile = path.join(
    __dirname,
    'storage',
    'auth.json'
);

module.exports = defineConfig({
    testDir: './tests',

    // Kept at 1 because the demo account has shared server-side state.
    // Parallel execution will be handled separately in Stage 21.
    workers: 1,

    use: {
        baseURL: environment.baseUrl,
    },

    projects: [
        {
            name: 'setup',
            testMatch: '**/*.setup.js',
            use: {
                browserName: 'chromium',
            },
        },

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
            dependencies: ['setup'],

            use: {
                browserName: 'chromium',
                storageState: authFile,
            },
        },

        {
            name: 'firefox',
            testIgnore: [
                '**/auth/*.spec.js',
                '**/api/*.spec.js',
                '**/*.setup.js',
            ],
            dependencies: ['setup'],

            use: {
                browserName: 'firefox',
                storageState: authFile,
            },
        },

        {
            name: 'webkit',
            testIgnore: [
                '**/auth/*.spec.js',
                '**/api/*.spec.js',
                '**/*.setup.js',
            ],
            dependencies: ['setup'],

            use: {
                browserName: 'webkit',
                storageState: authFile,
            },
        },
    ],
});