const { test, expect } = require('@playwright/test');

test.describe('Authentication API', () => {

    test('API-001 | valid credentials return successful login response @api @smoke', async ({
        request
    }) => {

        const response = await request.post(
            'https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: {
                    userEmail: process.env.TEST_EMAIL,
                    userPassword: process.env.TEST_PASSWORD
                }
            }
        );

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();

        expect(responseBody.message).toBe(
            'Login Successfully'
        );

        expect(responseBody.userId).toBeTruthy();

        expect(responseBody.userId).toMatch(
            /^[a-f0-9]{24}$/i
        );

        expect(responseBody.token).toBeTruthy();
    });

        test('API-003 | invalid password returns authentication error @api @negative', async ({
        request
    }) => {
        const response = await request.post(
            'https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: {
                    userEmail: process.env.TEST_EMAIL,
                    userPassword: 'InvalidPassword123!'
                }
            }
        );

        expect(response.status()).toBe(400);
        expect(response.ok()).toBeFalsy();

        const responseBody = await response.json();

        expect(responseBody.message).toBe(
            'Incorrect email or password.'
        );

        expect(responseBody.token).toBeUndefined();
    });

});