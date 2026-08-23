const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ProductsPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { OrderConfirmationPage } = require('../../pages/OrderConfirmationPage');
const productData = require('../../data/products.json');

test.describe('Checkout', () => {

    test.beforeEach(async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        const product = productData.products.adidasOriginal;

        await productsPage.goto();

        await productsPage.addProductToCart(product.name);

        await expect(
            productsPage.productAddedToast
        ).toBeVisible();

        await productsPage.openCart();

        await cartPage.proceedToCheckout();

        await expect(page).toHaveURL(
            /#\/dashboard\/order\?prop=/
        );
    });

    test('CHECKOUT-001 | country is required before placing order @regression', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await expect(
        checkoutPage.placeOrderButton
    ).toBeVisible();

    await checkoutPage.placeOrder();

    await expect(
        checkoutPage.shippingInformationError
    ).toBeVisible();
    });

   test('CHECKOUT-002 | user can successfully place an order @smoke', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new OrderConfirmationPage(page);

    const product = productData.products.adidasOriginal;

    await checkoutPage.selectCountry('Egypt');

    await expect(
        checkoutPage.countryInput
    ).toHaveValue('Egypt');

    await checkoutPage.placeOrder();

    await expect(page).toHaveURL(
        /#\/dashboard\/thanks\?prop=/
    );

    await expect(
        confirmationPage.confirmationHeading
    ).toBeVisible();

    await expect(
        page.getByText(product.name, {
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByText(
            new RegExp(`\\$\\s*${product.price}`)
        )
    ).toBeVisible();

    const orderId = await confirmationPage.getOrderId();

    expect(orderId).toMatch(/^[a-f0-9]{24}$/i);

    console.log('Created Order ID:', orderId);
    });
});