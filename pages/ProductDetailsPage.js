class ProductDetailsPage {
    constructor(page) {
        this.page = page;

        this.addToCartButton = page.getByRole('button', {
            name: /add to cart/i
        });

        this.continueShoppingLink = page.getByRole('link', {
            name: /continue shopping/i
        });

        this.productAddedToast = page.getByText(
            'Product Added To Cart',
            { exact: true }
        );

        this.cartButton = page.locator(
            'button[routerlink="/dashboard/cart"]'
        );
    }

    getProductName(productName) {
        return this.page.getByText(productName, {
            exact: true
        });
    }

    getProductPrice(price) {
        return this.page.getByText(
            new RegExp(`\\$\\s*${price}`)
        );
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async continueShopping() {
    await this.continueShoppingLink.click();
}
}

module.exports = { ProductDetailsPage };