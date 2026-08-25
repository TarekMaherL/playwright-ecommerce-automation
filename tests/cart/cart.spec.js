const { test, expect } = require('../../fixtures/testFixtures');
const productData = require('../../data/products.json');

test.describe('Cart', () => {

    test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    });

    test('CART-001 | added product is displayed in cart @smoke @regression', async ({ 
        page,
        productsPage,
        cartPage 
    }) => {
        
        const product = productData.products.adidasOriginal;

        await productsPage.addProductToCart(product.name);

        await expect(
            productsPage.productAddedToast
        ).toBeVisible();

        await productsPage.openCart();

        await expect(page).toHaveURL(
            /#\/dashboard\/cart$/
        );

        await expect(
            cartPage.getProductName(product.name)
        ).toBeVisible();
    });

    test('CART-002 | user can continue shopping from cart @regression', async ({
    page,
    productsPage,
    cartPage
}) => {

    const product = productData.products.adidasOriginal;

    await productsPage.addProductToCart(product.name);

    await expect(
        productsPage.productAddedToast
    ).toBeVisible();

    await productsPage.openCart();

    await expect(page).toHaveURL(
        /#\/dashboard\/cart$/
    );

    await cartPage.continueShopping();

    await expect(page).toHaveURL(
        /#\/dashboard\/dash$/
    );

    await expect(
        productsPage.getProductCard(product.name)
    ).toBeVisible();
    });

    test('CART-003 | user can remove product from cart @regression', async ({
    page,
    productsPage,
    cartPage
}) => {

    const product = productData.products.adidasOriginal;

    await productsPage.addProductToCart(product.name);

    await expect(
        productsPage.productAddedToast
    ).toBeVisible();

    await productsPage.openCart();

    await expect(
        cartPage.getProductName(product.name)
    ).toBeVisible();

    await cartPage.deleteProduct(product.name);

    await expect(
    cartPage.getCartItem(product.name)
    ).toHaveCount(0);

    await expect(
        cartPage.getCartItem(product.name)
    ).toHaveCount(0);
    });

    test('CART-004 | cart displays correct product price and totals @regression', async ({
    page,
    productsPage,
    cartPage
}) => {

    const product = productData.products.adidasOriginal;

    await productsPage.addProductToCart(product.name);

    await expect(
        productsPage.productAddedToast
    ).toBeVisible();

    await productsPage.openCart();

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
    });

    test('CART-005 | user can proceed from cart to checkout @smoke @regression', async ({
    page,
    productsPage,
    cartPage
}) => {

    const product = productData.products.adidasOriginal;

    await productsPage.addProductToCart(product.name);

    await expect(
        productsPage.productAddedToast
    ).toBeVisible();

    await productsPage.openCart();

    await expect(
        cartPage.getProductName(product.name)
    ).toBeVisible();

    await expect(
        cartPage.checkoutButton
    ).toBeVisible();

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(
        /#\/dashboard\/order\?prop=/
    );
    });
});
