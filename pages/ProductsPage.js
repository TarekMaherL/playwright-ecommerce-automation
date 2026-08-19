class ProductsPage {
    constructor(page) {
    this.page = page;

    this.productCards = page.locator('.card-body');
    this.productNames = page.locator('.card-body b');
    this.minPriceInput = page.getByRole('textbox', {
    name: 'Min Price'
    });

    this.maxPriceInput = page.getByRole('textbox', {
    name: 'Max Price'
    });
    this.searchInput = page.getByRole('textbox', {
    name: 'search'
    });

    this.noProductsFoundToast = page.getByText(
    'No Products Found',
    { exact: true }
    );

    this.productAddedToast = page.getByText(
        'Product Added To Cart',
        { exact: true }
    );

    this.signOutButton = page.getByRole('button', {
        name: /sign out/i
    });

    this.cartButton = page.locator(
        'button[routerlink="/dashboard/cart"]'
    );
    }

    async goto() {
        await this.page.goto('#/dashboard/dash');
    }

    getProductCard(productName) {
        return this.productCards.filter({
            has: this.page.getByText(productName, {
                exact: true
            })
        });
    }

    

    async openProductDetails(productName) {
    const productCard = this.getProductCard(productName);

    await productCard
        .getByRole('button', { name: /view/i })
        .click();
    }

    async logout() {
        await this.signOutButton.click();
    }

    async addProductToCart(productName) {
    const productCard = this.getProductCard(productName);

    await productCard
        .getByRole('button', { name: /add to cart/i })
        .click();
    }

    async addToCart() {
    await this.addToCartButton.click();
    }

    async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchInput.press('Enter');
    }

    getFilterSection(sectionName) {
        return this.page
        .locator('#sidebar form > div')
        .filter({
            has: this.page.getByText(sectionName, {
                exact: true
            })
        });
    }

    getFilterCheckbox(sectionName, optionName) {
        const section = this.getFilterSection(sectionName);

        return section
        .getByText(optionName, { exact: true })
        .locator('..')
        .locator('input[type="checkbox"]');
    }

    async filterByOption(sectionName, optionName) {
        await this.getFilterCheckbox(
        sectionName,
        optionName
        ).check();
    }
    async filterByPriceRange(minPrice, maxPrice) {
    await this.minPriceInput.fill(String(minPrice));
    await this.maxPriceInput.fill(String(maxPrice));
    await this.maxPriceInput.press('Enter');
    }
}

module.exports = { ProductsPage };