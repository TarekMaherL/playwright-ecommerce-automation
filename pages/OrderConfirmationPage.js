class OrderConfirmationPage {
    constructor(page) {
        this.page = page;

        this.confirmationHeading = page.getByRole('heading', {
            name: /thankyou for the order\./i
        });

        this.orderIdLabel = page.locator(
            'td.em-spacer-1 label.ng-star-inserted'
        );
    }

    getProduct(productName) {
        return this.page.getByText(productName, {
            exact: true
        });
    }

    getPrice(productPrice) {
        return this.page.getByText(
            new RegExp(`\\$\\s*${productPrice}`)
        );
    }

    async getOrderId() {
        const orderIdText = await this.orderIdLabel.textContent();

        return orderIdText
            .replace(/\|/g, '')
            .trim();
    }
}

module.exports = { OrderConfirmationPage };