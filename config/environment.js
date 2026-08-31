const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, '..', '.env'),
    quiet: true,
});

function getRequiredEnvironmentVariable(variableName) {
    const value = process.env[variableName];

    if (value === undefined || value.trim() === '') {
        throw new Error(
            `Missing required environment variable: ${variableName}`
        );
    }

    return value;
}

const testEmail = getRequiredEnvironmentVariable(
    'TEST_EMAIL'
).trim();

const testPassword = getRequiredEnvironmentVariable(
    'TEST_PASSWORD'
);

const testEmail2 = getRequiredEnvironmentVariable(
    'TEST_EMAIL_2'
).trim();

const testPassword2 = getRequiredEnvironmentVariable(
    'TEST_PASSWORD_2'
);

const environment = Object.freeze({
    baseUrl: getRequiredEnvironmentVariable(
        'BASE_URL'
    ).trim(),

    // Kept for existing authentication and API tests.
    testEmail,
    testPassword,

    // Accounts available for parallel business-test workers.
    testAccounts: Object.freeze([
        Object.freeze({
            email: testEmail,
            password: testPassword,
        }),
        Object.freeze({
            email: testEmail2,
            password: testPassword2,
        }),
    ]),
});

module.exports = { environment };