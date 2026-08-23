class CartPage {
    constructor(page) {
        this.page = page;

        this.continueShoppingButton = page.getByRole('button', {
            name: /continue shopping/i
        });

        this.emptyCartMessage = page.getByText(
            'No Products in Your Cart !',
            { exact: true }
        );

        this.checkoutButton = page.getByRole('button', {
            name: /checkout/i
        });
    }

    getCartItem(productName) {
        return this.page.locator('li.items').filter({
            has: this.page.getByText(productName, {
                exact: true
            })
        });
    }

    getProductName(productName) {
        return this.getCartItem(productName)
            .getByText(productName, {
                exact: true
            });
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async deleteProduct(productName) {
        const cartItem = this.getCartItem(productName);

        await cartItem
            .locator('.removeWrap button.btn-danger')
            .click();
    }

    getProductPrice(productName) {
    return this.getCartItem(productName)
        .locator('.prodTotal p');
    }

    getSummaryRow(label) {
    return this.page
        .locator('.subtotal .totalRow')
        .filter({
            has: this.page.locator('.label').filter({
                hasText: new RegExp(`^${label}$`, 'i')
            })
        });
    }

    getSubtotalValue() {
        return this.getSummaryRow('Subtotal')
            .locator('.value');
    }

    getTotalValue() {
        return this.getSummaryRow('Total')
            .locator('.value');
    }

    async proceedToCheckout() {
    await this.checkoutButton.click();
    }
}

module.exports = { CartPage };