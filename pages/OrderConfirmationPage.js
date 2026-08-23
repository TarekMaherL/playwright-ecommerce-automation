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

    async getOrderId() {
        const orderIdText = await this.orderIdLabel.textContent();

        return orderIdText
            .replace(/\|/g, '')
            .trim();
    }
}

module.exports = { OrderConfirmationPage };