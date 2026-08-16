const path = require('path');
const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

const authFile = path.join(
    __dirname,
    '../../storage/auth.json'
);

setup('authenticate demo user', async ({ page }) => {
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

    await page.context().storageState({
        path: authFile
    });
});