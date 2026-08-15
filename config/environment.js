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

const environment = Object.freeze({
  baseUrl: getRequiredEnvironmentVariable('BASE_URL').trim(),
  testEmail: getRequiredEnvironmentVariable('TEST_EMAIL').trim(),
  testPassword: getRequiredEnvironmentVariable('TEST_PASSWORD'),
});

module.exports = { environment };