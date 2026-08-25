const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');

test.describe('Logout', () => {
    test('AUTH-002 | authenticated user can logout @smoke @regression @auth', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        await loginPage.goto();

        await loginPage.login(
            process.env.TEST_EMAIL,
            process.env.TEST_PASSWORD
        );

        await expect(page).toHaveURL(/#\/dashboard\/dash$/);

        await productsPage.logout();

        await expect(page).toHaveURL(/#\/auth\/login$/);
        await expect(loginPage.loginButton).toBeVisible();
    });
});