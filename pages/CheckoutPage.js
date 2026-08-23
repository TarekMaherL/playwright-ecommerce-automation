class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.countryInput = page.getByPlaceholder('Select Country');

        this.placeOrderButton = page
            .locator('a.action__submit')
            .filter({
                hasText: 'Place Order'
            });

        this.shippingInformationError = page
            .locator('#toast-container .toast-error')
            .filter({
                hasText: 'Please Enter Full Shipping Information'
            });
    }

    async selectCountry(countryName) {
        await this.countryInput.clear();

        await this.countryInput.pressSequentially(
            countryName.substring(0, 2).toLowerCase()
        );

        const countryOption = this.page
            .locator('button.ta-item')
            .filter({
                hasText: countryName
            });

        await countryOption.click();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}

module.exports = { CheckoutPage };