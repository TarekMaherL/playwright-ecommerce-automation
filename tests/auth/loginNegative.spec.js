const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const invalidLoginData = require('../../data/invalidLoginData.json');

test.describe('Negative Authentication', () => {
    for (const testCase of invalidLoginData.validationCases) {
        test(`${testCase.id} | rejects login with ${testCase.caseName} @regression @auth @negative`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.goto();

            await loginPage.login(
                testCase.email,
                testCase.password
            );

            await expect(
                loginPage.getValidationMessage(testCase.expectedMessage)
            ).toBeVisible();

            await expect(page).toHaveURL(/#\/auth\/login$/);
        });
    }

    test('AUTH-007 | rejects login when both fields are empty @regression @auth @negative', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('', '');

        await expect(loginPage.emailRequiredError).toBeVisible();
        await expect(loginPage.passwordRequiredError).toBeVisible();

        await expect(page).toHaveURL(/#\/auth\/login$/);
    });

    test('AUTH-003 | rejects unknown email @regression @auth @negative', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'unknown.user@example.com',
            'DummyPassword123!'
        );

        await expect(loginPage.invalidCredentialsToast).toBeVisible();
        await expect(page).toHaveURL(/#\/auth\/login$/);
    });

    test('AUTH-004 | rejects incorrect password @regression @auth @negative', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            process.env.TEST_EMAIL,
            'DefinitelyWrongPassword123!'
        );

        await expect(loginPage.invalidCredentialsToast).toBeVisible();
        await expect(page).toHaveURL(/#\/auth\/login$/);
    });
});