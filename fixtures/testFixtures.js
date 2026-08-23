const { test: base, expect } = require('@playwright/test');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { OrderConfirmationPage } = require('../pages/OrderConfirmationPage');
const { OrdersPage } = require('../pages/OrdersPage');
const { OrderDetailsPage } = require('../pages/OrderDetailsPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');

const test = base.extend({
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);

        await use(productsPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);

        await use(cartPage);
    },

    checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);

    await use(checkoutPage);
    },

    confirmationPage: async ({ page }, use) => {
    const confirmationPage = new OrderConfirmationPage(page);

    await use(confirmationPage);
    },

    ordersPage: async ({ page }, use) => {
    const ordersPage = new OrdersPage(page);

    await use(ordersPage);
    },

    orderDetailsPage: async ({ page }, use) => {
    const orderDetailsPage = new OrderDetailsPage(page);

    await use(orderDetailsPage);
    },

    productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);

    await use(productDetailsPage);
    }
});

module.exports = {
    test,
    expect
};