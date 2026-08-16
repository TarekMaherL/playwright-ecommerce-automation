class LoginPage {
    constructor(page) {
        this.page = page;

        this.emailInput = page.locator('#userEmail');
        this.passwordInput = page.locator('#userPassword');
        this.loginButton = page.locator('#login');

        this.emailRequiredError = page.getByText('*Email is required', {
            exact: true
        });

        this.passwordRequiredError = page.getByText('*Password is required', {
            exact: true
        });

        this.invalidEmailError = page.getByText('*Enter Valid Email', {
            exact: true
        });

        this.invalidCredentialsToast = page.getByText(
            'Incorrect email or password.',
            { exact: true }
        );
    }

    async goto() {
        await this.page.goto('#/auth/login');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    getValidationMessage(message) {
        return this.page.getByText(message, { exact: true });
    }
}

module.exports = { LoginPage };