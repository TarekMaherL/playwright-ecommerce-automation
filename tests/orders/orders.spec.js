const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ProductsPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { OrderConfirmationPage } = require('../../pages/OrderConfirmationPage');
const { OrdersPage } = require('../../pages/OrdersPage');
const { OrderDetailsPage } = require('../../pages/OrderDetailsPage');
const productData = require('../../data/products.json');

test.describe('Orders', () => {

    test('ORDER-001 | newly created order appears in order history @smoke', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const confirmationPage = new OrderConfirmationPage(page);
        const ordersPage = new OrdersPage(page);

        const product = productData.products.adidasOriginal;

        // Add product
        await productsPage.goto();

        await productsPage.addProductToCart(product.name);

        await expect(
            productsPage.productAddedToast
        ).toBeVisible();

        // Cart
        await productsPage.openCart();

        await expect(
            cartPage.getProductName(product.name)
        ).toBeVisible();

        await cartPage.proceedToCheckout();

        // Checkout
        await checkoutPage.selectCountry('Egypt');

        await expect(
            checkoutPage.countryInput
        ).toHaveValue('Egypt');

        await checkoutPage.placeOrder();

        // Confirmation
        await expect(
            confirmationPage.confirmationHeading
        ).toBeVisible();

        const orderId = await confirmationPage.getOrderId();

        expect(orderId).toMatch(/^[a-f0-9]{24}$/i);

        console.log('Created Order ID:', orderId);

        // Orders
        await ordersPage.openOrders();

        await expect(page).toHaveURL(
            /#\/dashboard\/myorders$/
        );

        await expect(
            ordersPage.getOrderId(orderId)
        ).toBeVisible();

        await expect(
            ordersPage.getProductName(
                orderId,
                product.name
            )
        ).toBeVisible();
    });

    test('ORDER-002 | user can open created order and validate order details @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new OrderConfirmationPage(page);
    const ordersPage = new OrdersPage(page);
    const orderDetailsPage = new OrderDetailsPage(page);

    const product = productData.products.adidasOriginal;

    // Product
    await productsPage.goto();

    await productsPage.addProductToCart(product.name);

    await expect(
        productsPage.productAddedToast
    ).toBeVisible();

    // Cart
    await productsPage.openCart();

    await expect(
        cartPage.getProductName(product.name)
    ).toBeVisible();

    await cartPage.proceedToCheckout();

    // Checkout
    await checkoutPage.selectCountry('Egypt');

    await expect(
        checkoutPage.countryInput
    ).toHaveValue('Egypt');

    await checkoutPage.placeOrder();

    // Confirmation
    await expect(
        confirmationPage.confirmationHeading
    ).toBeVisible();

    const orderId = await confirmationPage.getOrderId();

    expect(orderId).toMatch(/^[a-f0-9]{24}$/i);

    console.log('Created Order ID:', orderId);

    // Orders
    await ordersPage.openOrders();

    await expect(page).toHaveURL(
        /#\/dashboard\/myorders$/
    );

    await expect(
        ordersPage.getOrderId(orderId)
    ).toBeVisible();

    await ordersPage.openOrder(orderId);

    // Order Details
    await expect(page).toHaveURL(
        new RegExp(
            `#\\/dashboard\\/order-details\\/${orderId}$`
        )
    );

    await expect(
        orderDetailsPage.orderSummaryHeading
    ).toHaveText(/order summary/i);

    await expect(
        orderDetailsPage.getOrderId(orderId)
    ).toBeVisible();

    await expect(
        orderDetailsPage.getProductName(product.name)
    ).toHaveText(product.name);

    await expect(
        orderDetailsPage.getProductPrice(
            product.name,
            product.price
        )
    ).toBeVisible();
    });
});