class OrdersPage {
    constructor(page) {
        this.page = page;

        this.ordersButton = page.locator(
            'button[routerlink="/dashboard/myorders"]'
        );

        this.orderRows = page.locator('tbody tr');
    }

    async openOrders() {
        await this.ordersButton.click();
    }

    getOrderRow(orderId) {
        return this.orderRows.filter({
            has: this.page.getByText(orderId, {
                exact: true
            })
        });
    }

    getOrderId(orderId) {
        return this.getOrderRow(orderId)
            .getByText(orderId, {
                exact: true
            });
    }

    getProductName(orderId, productName) {
        return this.getOrderRow(orderId)
            .getByText(productName, {
                exact: true
            });
    }

    async openOrder(orderId) {
    const orderRow = this.getOrderRow(orderId);

    await orderRow
        .getByRole('button', {
            name: 'View',
            exact: true
        })
        .click();
    }
}

module.exports = { OrdersPage };