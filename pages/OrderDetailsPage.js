class OrderDetailsPage {
    constructor(page) {
        this.page = page;

        this.orderSummaryHeading = page.locator('.email-title');
    }

    getOrderId(orderId) {
        return this.page.getByText(orderId, {
            exact: true
        });
    }

    getProductCard(productName) {
        return this.page.locator('.artwork-card').filter({
            has: this.page.locator('.title').filter({
                hasText: productName
            })
        });
    }

    getProductName(productName) {
        return this.getProductCard(productName)
            .locator('.title');
    }

    getProductPrice(productName, price) {
        return this.getProductCard(productName)
            .getByText(
                new RegExp(`\\$\\s*${price}`)
            );
    }
}

module.exports = { OrderDetailsPage };