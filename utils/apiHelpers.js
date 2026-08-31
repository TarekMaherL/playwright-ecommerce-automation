const { environment } = require('../config/environment');

async function getAuthData(
    request,
    account = {
        email: environment.testEmail,
        password: environment.testPassword,
    }
) {
    const response = await request.post(
        'https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: {
                userEmail: account.email,
                userPassword: account.password
            }
        }
    );

    if (!response.ok()) {
        throw new Error(
            `API authentication failed with status ${response.status()}`
        );
    }

    const responseBody = await response.json();

    if (!responseBody.token) {
        throw new Error(
            'API authentication succeeded but no token was returned'
        );
    }

    if (!responseBody.userId) {
        throw new Error(
            'API authentication succeeded but no userId was returned'
        );
    }

    return {
        token: responseBody.token,
        userId: responseBody.userId
    };
}

async function getAuthToken(request, account) {
    const { token } = await getAuthData(
        request,
        account
    );

    return token;
}

module.exports = {
    getAuthData,
    getAuthToken
};