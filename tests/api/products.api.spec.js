const { test, expect } = require('@playwright/test');
const productData = require('../../data/products.json');
const { getAuthToken } = require('../../utils/apiHelpers');

test.describe('Products API', () => {

    test('API-002 | product catalog contains expected product @api @regression', async ({
        request
    }) => {
        const token = await getAuthToken(request);

        const productsResponse = await request.post(
            'https://rahulshettyacademy.com/api/ecom/product/get-all-products',
            {
                headers: {
                    Authorization: token
                }
            }
        );

        expect(productsResponse.status()).toBe(200);
        expect(productsResponse.ok()).toBeTruthy();

        const productsBody = await productsResponse.json();

        expect(Array.isArray(productsBody.data)).toBeTruthy();

        const expectedProduct =
            productData.products.adidasOriginal;

        const apiProduct = productsBody.data.find(
            product =>
                product.productName === expectedProduct.name
        );

        expect(apiProduct).toBeTruthy();

        expect(apiProduct.productName).toBe(
            expectedProduct.name
        );

        expect(apiProduct.productPrice).toBe(
            expectedProduct.price
        );

        expect(apiProduct.productStatus).toBe(true);
    });

    test('API-004 | product catalog rejects request without authentication token @api @negative @regression', async ({
    request
    }) => {
        const response = await request.post(
            'https://rahulshettyacademy.com/api/ecom/product/get-all-products'
        );

        expect(response.status()).toBe(401);
        expect(response.ok()).toBeFalsy();

        const responseBody = await response.json();

        expect(responseBody.type).toBe('Invalid');

        expect(responseBody.message).toBe(
            'Access denied. No token provided.'
        );
    });

    test('API-005 | product catalog rejects invalid authentication token @api @negative @regression', async ({
    request
    }) => {
        const response = await request.post(
            'https://rahulshettyacademy.com/api/ecom/product/get-all-products',
            {
                headers: {
                    Authorization: 'invalid-test-token'
                }
            }
        );

        expect(response.status()).toBe(401);
        expect(response.ok()).toBeFalsy();

        const responseBody = await response.json();

        expect(responseBody.type).toBe('Invalid');

        expect(responseBody.message).toBe(
            'Session Timeout'
        );
    });

});