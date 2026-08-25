async function getAuthData(request) {
    const response = await request.post(
        'https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: {
                userEmail: process.env.TEST_EMAIL,
                userPassword: process.env.TEST_PASSWORD
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

async function getAuthToken(request) {
    const { token } = await getAuthData(request);

    return token;
}

module.exports = {
    getAuthData,
    getAuthToken
};