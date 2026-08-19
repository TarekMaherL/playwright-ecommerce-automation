const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ProductsPage');
const productData = require('../../data/products.json');
const { ProductDetailsPage } = require('../../pages/ProductDetailsPage');

test.describe('Products', () => {
    test.beforeEach(async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await productsPage.goto();
    });

    test('PRODUCT-001 | product catalog loads for authenticated user @smoke', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await expect(page).toHaveURL(/#\/dashboard\/dash$/);

        await expect(productsPage.productCards.first()).toBeVisible();

        await expect(productsPage.signOutButton).toBeVisible();
    });

    test('PRODUCT-002 | product names are displayed @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        const adidasProduct = productsPage.getProductCard(
            productData.products.adidasOriginal.name
        );

        await expect(adidasProduct).toBeVisible();

        await expect(
            adidasProduct.getByText(
                productData.products.adidasOriginal.name,
                { exact: true }
            )
        ).toBeVisible();
    });

    test('PRODUCT-003 | product price is displayed correctly @regression', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        const adidasProduct = productsPage.getProductCard(
            productData.products.adidasOriginal.name
        );

        await expect(adidasProduct).toContainText(
            new RegExp(`\\$\\s*${productData.products.adidasOriginal.price}`)
        );
    });

    test('PRODUCT-004 | user can open product details @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    const product = productData.products.adidasOriginal;

    await productsPage.openProductDetails(product.name);

    await expect(page).toHaveURL(
        /#\/dashboard\/product-details\//
    );

    await expect(
        productDetailsPage.addToCartButton
    ).toBeVisible();
    });


test('PRODUCT-005 | product name remains consistent on details page @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    const product = productData.products.adidasOriginal;

    await productsPage.openProductDetails(product.name);

    await expect(
        productDetailsPage.getProductName(product.name)
    ).toHaveText(product.name);
    });


test('PRODUCT-006 | product price remains consistent on details page @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    const product = productData.products.adidasOriginal;

    await productsPage.openProductDetails(product.name);

    await expect(
        productDetailsPage.getProductPrice(product.price)
    ).toBeVisible();
    });

    test('PRODUCT-007 | user can add product to cart from catalog @smoke', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const product = productData.products.adidasOriginal;

    await productsPage.addProductToCart(product.name);

    await expect(
        productsPage.productAddedToast
    ).toBeVisible();

    await expect(
        productsPage.cartButton
    ).toContainText('1');
    });

    test('PRODUCT-008 | user can add product to cart from product details @smoke', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    const product = productData.products.adidasOriginal;

    await productsPage.openProductDetails(product.name);

    await expect(
        productDetailsPage.getProductName(product.name)
    ).toBeVisible();

    await productDetailsPage.addToCart();

    await expect(
        productDetailsPage.productAddedToast
    ).toBeVisible();

    await expect(
        productDetailsPage.cartButton
    ).toContainText('1');
    });

    test('PRODUCT-009 | user can search for an existing product @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const product = productData.products.iphone13Pro;

    await productsPage.searchProduct(product.name);

    const searchedProduct = productsPage.getProductCard(product.name);

    await expect(searchedProduct).toBeVisible();

    await expect(
        searchedProduct.getByText(product.name, { exact: true })
    ).toBeVisible();
    });

    test('PRODUCT-010 | search shows no products for unknown product @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const unknownProduct = 'PRODUCT THAT DOES NOT EXIST';

    await productsPage.searchProduct(unknownProduct);

    await expect(
        productsPage.noProductsFoundToast
    ).toBeVisible();

    await expect(
        productsPage.productCards
    ).toHaveCount(0);
    });

    test('PRODUCT-011 | user can filter products by category @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const category = 'electronics';

    await productsPage.filterByOption(
        'Categories',
        category
    );

    await expect(
        productsPage.getFilterCheckbox(
            'Categories',
            category
        )
    ).toBeChecked();

    await expect(
        productsPage.productCards
    ).toHaveCount(3);

    await expect(
        productsPage.getProductCard(
            productData.products.adidasOriginal.name
        )
    ).toBeVisible();

    await expect(
        productsPage.getProductCard(
            productData.products.zaraCoat.name
        )
    ).toBeVisible();

    await expect(
        productsPage.getProductCard(
            productData.products.iphone13Pro.name
        )
    ).toBeVisible();
    });

    test('PRODUCT-012 | user can filter products by subcategory @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const subcategory = 'mobiles';

    await productsPage.filterByOption(
        'Sub Categories',
        subcategory
    );

    await expect(
        productsPage.getFilterCheckbox(
            'Sub Categories',
            subcategory
        )
    ).toBeChecked();

    await expect(
        productsPage.productCards
    ).toHaveCount(3);

    await expect(
        productsPage.getProductCard(
            productData.products.adidasOriginal.name
        )
    ).toBeVisible();

    await expect(
        productsPage.getProductCard(
            productData.products.zaraCoat.name
        )
    ).toBeVisible();

    await expect(
        productsPage.getProductCard(
            productData.products.iphone13Pro.name
        )
    ).toBeVisible();
    });

    test('PRODUCT-013 | user can filter products by gender @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const gender = 'women';

    await productsPage.filterByOption(
        'Search For',
        gender
    );

    await expect(
        productsPage.getFilterCheckbox(
            'Search For',
            gender
        )
    ).toBeChecked();

    await expect(
        productsPage.productCards
    ).toHaveCount(3);

    await expect(
        productsPage.getProductCard(
            productData.products.adidasOriginal.name
        )
    ).toBeVisible();

    await expect(
        productsPage.getProductCard(
            productData.products.zaraCoat.name
        )
    ).toBeVisible();

    await expect(
        productsPage.getProductCard(
            productData.products.iphone13Pro.name
        )
    ).toBeVisible();
    });

    test('PRODUCT-014 | user can filter products by price range @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const product = productData.products.iphone13Pro;

    await productsPage.filterByPriceRange(
        50000,
        60000
    );

    await expect(
        productsPage.productCards
    ).toHaveCount(1);

    await expect(
        productsPage.getProductCard(product.name)
    ).toBeVisible();

    await expect(
        productsPage.getProductCard(
            productData.products.adidasOriginal.name
        )
    ).toHaveCount(0);

    await expect(
        productsPage.getProductCard(
            productData.products.zaraCoat.name
        )
    ).toHaveCount(0);
    });

    test('PRODUCT-015 | user can continue shopping from product details @regression', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    const product = productData.products.adidasOriginal;

    await productsPage.openProductDetails(product.name);

    await expect(page).toHaveURL(
        /#\/dashboard\/product-details\//
    );

    await expect(
        productDetailsPage.continueShoppingLink
    ).toBeVisible();

    await productDetailsPage.continueShopping();

    await expect(page).toHaveURL(
        /#\/dashboard\/dash$/
    );

    await expect(
        productsPage.productCards.first()
    ).toBeVisible();
    });
});