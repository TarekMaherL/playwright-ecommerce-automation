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
            name: 'auth-chromium',
            testMatch: '**/auth/*.spec.js',
            use: {
                browserName: 'chromium',
            },
        },

        {
            name: 'chromium',
            testIgnore: [
                '**/auth/*.spec.js',
                '**/*.setup.js',
            ],
            dependencies: ['setup'],

            use: {
                browserName: 'chromium',
                storageState: authFile,
            },
        },
    ],
});