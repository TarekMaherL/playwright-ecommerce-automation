const { test, expect } = require('../../fixtures/testFixtures');
const productData = require('../../data/products.json');

test.describe('Purchase E2E', () => {

    test('E2E-001 | user can complete purchase and verify order @smoke @e2e @regression', async ({
    page,
    productsPage,
    cartPage,
    checkoutPage,
    confirmationPage,
    ordersPage,
    orderDetailsPage
}) => {

        const product = productData.products.adidasOriginal;

        // Product catalog
        await productsPage.goto();

        await expect(page).toHaveURL(
            /#\/dashboard\/dash$/
        );

        await expect(
            productsPage.getProductCard(product.name)
        ).toBeVisible();

        // Add product to cart
        await productsPage.addProductToCart(product.name);

        await expect(
            productsPage.productAddedToast
        ).toBeVisible();

        await expect(
            productsPage.cartButton
        ).toContainText('1');

        // Cart
        await productsPage.openCart();

        await expect(page).toHaveURL(
            /#\/dashboard\/cart$/
        );

        await expect(
            cartPage.getProductName(product.name)
        ).toBeVisible();

        await expect(
            cartPage.getProductPrice(product.name)
        ).toHaveText(
            new RegExp(`^\\$\\s*${product.price}$`)
        );

        await expect(
            cartPage.getSubtotalValue()
        ).toHaveText(
            new RegExp(`^\\$\\s*${product.price}$`)
        );

        await expect(
            cartPage.getTotalValue()
        ).toHaveText(
            new RegExp(`^\\$\\s*${product.price}$`)
        );

        // Checkout
        await cartPage.proceedToCheckout();

        await expect(page).toHaveURL(
            /#\/dashboard\/order\?prop=/
        );

        await checkoutPage.selectCountry('Egypt');

        await expect(
            checkoutPage.countryInput
        ).toHaveValue('Egypt');

        await checkoutPage.placeOrder();

        // Confirmation
        await expect(page).toHaveURL(
            /#\/dashboard\/thanks\?prop=/
        );

        await expect(
            confirmationPage.confirmationHeading
        ).toBeVisible();

        const orderId = await confirmationPage.getOrderId();

        expect(orderId).toMatch(/^[a-f0-9]{24}$/i);

        // Order history
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

        // Order details
        await ordersPage.openOrder(orderId);

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