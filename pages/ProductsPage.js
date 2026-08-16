class ProductsPage {
    constructor(page) {
        this.page = page;

        this.signOutButton = page.getByRole('button', {
            name: /sign out/i
        });
    }

    async logout() {
        await this.signOutButton.click();
    }
}

module.exports = { ProductsPage };