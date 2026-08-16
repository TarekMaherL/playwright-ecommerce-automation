const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ProductsPage');

test.describe('Products', () => {
    test('PRODUCT-001 | authenticated user can access product catalog @smoke', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await page.goto('#/dashboard/dash');

        await expect(page).toHaveURL(/#\/dashboard\/dash$/);

        await expect(productsPage.signOutButton).toBeVisible();
    });
});