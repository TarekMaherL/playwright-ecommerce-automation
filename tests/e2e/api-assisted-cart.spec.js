const { test, expect } = require('../../fixtures/testFixtures');
const { getAuthData } = require('../../utils/apiHelpers');
const productData = require('../../data/products.json');

test.describe('API-Assisted UI Tests', () => {

    test('E2E-002 | add product through API and validate it in cart UI @api @e2e @smoke @regression', async ({
        request,
        page,
        cartPage,
        testAccount
    }) => {
        const expectedProduct =
            productData.products.adidasOriginal;

        // Authenticate through API
        const { token, userId } =
            await getAuthData(request,
                testAccount
            );

        // Get the real product object from the backend
        const productsResponse = await request.post(
            'https://rahulshettyacademy.com/api/ecom/product/get-all-products',
            {
                headers: {
                    Authorization: token
                }
            }
        );

        expect(productsResponse.status()).toBe(200);

        const productsBody =
            await productsResponse.json();

        const apiProduct = productsBody.data.find(
            product =>
                product.productName === expectedProduct.name
        );

        expect(apiProduct).toBeTruthy();

        // Add the product directly through the API
        const addToCartResponse = await request.post(
            'https://rahulshettyacademy.com/api/ecom/user/add-to-cart',
            {
                headers: {
                    Authorization: token
                },
                data: {
                    _id: userId,
                    product: apiProduct
                }
            }
        );

        expect(addToCartResponse.status()).toBe(200);

        const addToCartBody =
            await addToCartResponse.json();

        expect(addToCartBody.message).toBe(
            'Product Added To Cart'
        );

        // Validate the API-created state through the UI
        await cartPage.goto();

        await expect(page).toHaveURL(
            /#\/dashboard\/cart/
        );

        await expect(
            cartPage.getCartItem(expectedProduct.name)
        ).toBeVisible();

        await expect(
            cartPage.getProductName(expectedProduct.name)
        ).toHaveText(expectedProduct.name);
    });

});