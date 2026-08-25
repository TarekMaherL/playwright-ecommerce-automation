const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Authentication', () => {
    test('AUTH-001 | user can login with valid credentials @smoke @regression @auth', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            process.env.TEST_EMAIL,
            process.env.TEST_PASSWORD
        );

        await expect(page).toHaveURL(/#\/dashboard\/dash$/);
        await expect(
            page.getByRole('button', { name: /sign out/i })
        ).toBeVisible();
    });
});