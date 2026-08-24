# Playwright E-Commerce Automation Framework

A professional end-to-end test automation framework built with **Playwright, JavaScript, and Node.js** for an e-commerce web application.

The project demonstrates practical QA automation concepts including:

* Page Object Model
* Custom Playwright fixtures
* UI and API testing
* Data-driven testing
* Authentication using `storageState`
* Smoke and regression coverage
* Dynamic test data handling
* End-to-end purchase validation
* Secure environment configuration
* Reusable test architecture

## Application Under Test

**Rahul Shetty Academy E-Commerce Client**

```text
https://rahulshettyacademy.com/client/
```

---

## Tech Stack

* Playwright
* JavaScript
* Node.js
* Playwright Test Runner
* REST API Testing with Playwright `APIRequestContext`
* Page Object Model
* Custom Fixtures
* JSON test data
* Environment Variables
* Git
* GitHub

---

## Framework Architecture

The framework follows a layered architecture:

```text
Tests
   ↓
Custom Fixtures
   ↓
Page Objects
   ↓
Application UI / API
```

### Page Objects

Page Objects contain:

* Locators
* Page-specific actions
* Reusable UI behavior

Business assertions remain primarily inside the test files.

### Custom Fixtures

Custom Playwright fixtures create and inject Page Object instances into tests.

Example:

```javascript
test('example test', async ({
    productsPage,
    cartPage
}) => {
    // Page objects are already available
});
```

This reduces repeated object creation while keeping test scenarios readable.

---

## Project Structure

```text
playwright-ecommerce-automation/
│
├── data/
│   ├── invalidLoginData.json
│   └── products.json
│
├── fixtures/
│   └── testFixtures.js
│
├── pages/
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── ProductDetailsPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── OrderConfirmationPage.js
│   ├── OrdersPage.js
│   └── OrderDetailsPage.js
│
├── storage/
│   └── auth.json
│
├── test-cases/
│   └── testCoverage.md
│
├── tests/
│   ├── api/
│   │   └── auth.api.spec.js
│   │
│   ├── auth/
│   │   ├── login.spec.js
│   │   ├── loginNegative.spec.js
│   │   └── logout.spec.js
│   │
│   ├── cart/
│   │   └── cart.spec.js
│   │
│   ├── checkout/
│   │   └── checkout.spec.js
│   │
│   ├── e2e/
│   │   └── purchase.spec.js
│   │
│   ├── orders/
│   │   └── orders.spec.js
│   │
│   ├── products/
│   │   └── products.spec.js
│   │
│   └── setup/
│       └── auth.setup.js
│
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

> `storage/auth.json` is generated locally and is excluded from Git.

---

# Current Automated Coverage

## Authentication

* `AUTH-001` Valid login
* `AUTH-002` Logout
* `AUTH-003` Unknown email
* `AUTH-004` Incorrect password
* `AUTH-005` Empty email
* `AUTH-006` Empty password
* `AUTH-007` Empty email and password
* `AUTH-008` Invalid email format

Authentication tests use the real login UI.

Authenticated business tests use Playwright `storageState`.

---

## Products

The current product suite covers:

* Product catalog loading
* Product name validation
* Product price validation
* Product details navigation
* Product name consistency
* Product price consistency
* Add to cart from catalog
* Add to cart from product details
* Positive product search
* No-result product search
* Category filtering
* Subcategory filtering
* Gender filtering
* Price range filtering
* Continue Shopping navigation

---

## Cart

Current cart coverage includes:

* Added product appears in cart
* Continue Shopping
* Remove product
* Product price validation
* Subtotal validation
* Total validation
* Cart-to-checkout navigation

---

## Checkout

Current checkout coverage includes:

* Required country validation
* Successful country selection
* Successful order placement
* Order confirmation validation
* Dynamic Order ID capture
* Purchased product validation

---

## Orders

Current order coverage includes:

* Newly created order appears in Order History
* Dynamic Order ID correlation
* Locating the exact created order
* Opening the exact order
* Order details validation
* Product validation
* Price validation

---

# End-to-End Purchase Flow

The framework contains a complete business-critical E2E smoke scenario:

```text
Authenticated User
        ↓
Product Catalog
        ↓
Find Product
        ↓
Add To Cart
        ↓
Validate Cart
        ↓
Validate Price / Subtotal / Total
        ↓
Checkout
        ↓
Select Country
        ↓
Place Order
        ↓
Capture Dynamic Order ID
        ↓
Order History
        ↓
Find Same Order ID
        ↓
Open Exact Order
        ↓
Validate Order ID
        ↓
Validate Purchased Product
        ↓
Validate Price
```

The generated Order ID is captured dynamically during execution and reused later in the same workflow.

No existing or hardcoded Order ID is used.

---

# API Testing

The framework also includes API-level coverage using Playwright's built-in `APIRequestContext`.

Current API coverage:

### API-001 — Valid Login

Validates:

* `POST /api/ecom/auth/login`
* HTTP `200`
* Successful business response
* User ID presence and format
* Authentication token presence

Credentials are read securely from environment variables.

Example concept:

```javascript
const response = await request.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
        data: {
            userEmail: process.env.TEST_EMAIL,
            userPassword: process.env.TEST_PASSWORD
        }
    }
);
```

Authentication tokens and passwords are never printed or committed.

---

# Authentication Architecture

The framework separates authentication testing from authenticated business testing.

```text
setup project
      ↓
UI authentication
      ↓
storage/auth.json
      ↓
chromium project
      ↓
authenticated application tests
```

### Authentication Tests

Authentication scenarios perform real UI login/logout operations.

### Business Tests

Products, Cart, Checkout, Orders, and E2E tests reuse authenticated browser state through:

```text
storage/auth.json
```

This avoids repeating UI login before every business test.

---

# Environment Configuration

Create a local `.env` file based on `.env.example`.

Example:

```env
BASE_URL=
TEST_EMAIL=
TEST_PASSWORD=
```

Do not commit real credentials.

The following files are excluded from Git:

```text
.env
storage/auth.json
node_modules/
test-results/
playwright-report/
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/TarekMaherL/playwright-ecommerce-automation.git
```

Move into the project:

```bash
cd playwright-ecommerce-automation
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Create your local `.env` file using `.env.example`.

---

# Running Tests

## Run the complete suite

```bash
npx playwright test
```

## Run authentication tests

```bash
npx playwright test tests/auth
```

## Run product tests

```bash
npx playwright test tests/products
```

## Run cart tests

```bash
npx playwright test tests/cart
```

## Run checkout tests

```bash
npx playwright test tests/checkout
```

## Run order tests

```bash
npx playwright test tests/orders
```

## Run the full purchase E2E test

```bash
npx playwright test tests/e2e
```

## Run API tests

```bash
npx playwright test tests/api
```

---

# Test Tags

The project uses tags to organize test execution.

### Smoke

```bash
npx playwright test --grep "@smoke"
```

### Regression

```bash
npx playwright test --grep "@regression"
```

### E2E

```bash
npx playwright test --grep "@e2e"
```

### API

```bash
npx playwright test --grep "@api"
```

---

# Test Data

Reusable product data is stored in:

```text
data/products.json
```

Example:

```json
{
  "products": {
    "adidasOriginal": {
      "name": "ADIDAS ORIGINAL",
      "price": 11500
    }
  }
}
```

Reusable negative authentication data is stored separately in:

```text
data/invalidLoginData.json
```

Real credentials are never stored in JSON test data.

---

# Locator Strategy

The framework prioritizes stable Playwright locators:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. `getByTestId`
6. Stable CSS selectors when necessary

XPath is avoided unless there is no reasonable alternative.

Product actions are scoped to the correct product card or cart item rather than relying on index-based selectors such as `.nth(0)`.

---

# Synchronization Strategy

The framework uses Playwright's auto-waiting and web-first assertions.

Arbitrary waits such as:

```javascript
await page.waitForTimeout(...)
```

are avoided.

Examples include:

```javascript
await expect(locator).toBeVisible();
await expect(locator).toHaveText(...);
await expect(locator).toHaveCount(...);
await expect(page).toHaveURL(...);
```

---

# Test Independence and Parallel Execution

Tests are designed to be logically independent.

However, the application currently uses one shared demo account whose **server-side cart state is shared across browser contexts**.

Running cart-mutating tests concurrently can therefore cause backend test-data collisions.

For stability, the framework currently uses:

```javascript
workers: 1
```

This is an application/test-data limitation rather than a Playwright limitation.

A scalable parallel-execution strategy would use:

* Separate test users per worker
* API-based test-data setup and cleanup
* Isolated backend test data

---

# Security Practices

The project follows several security practices:

* No real credentials in source code
* No passwords in test data
* No authentication token logging
* `.env` excluded from Git
* Authentication storage state excluded from Git
* `.env.example` contains no secrets

---

# Current Framework Highlights

The project demonstrates:

* Professional Page Object Model implementation
* Reusable Playwright custom fixtures
* Secure authentication management
* UI and API testing in one framework
* Data-driven test design
* Dynamic Order ID handling
* Cross-page E2E workflow validation
* Smoke and regression tagging
* Web-first assertions
* Test isolation awareness
* Shared backend-state race-condition handling
* Git-based version control

---

# Roadmap

Planned improvements include:

* Additional REST API coverage
* API-assisted test setup and cleanup
* Cross-browser execution
* Enhanced reporting
* Screenshots, videos, and traces
* Parallel execution with isolated test users
* GitHub Actions CI/CD
* CI test reports and artifacts
* Final framework cleanup and documentation

---

# Repository

GitHub:

```text
https://github.com/TarekMaherL/playwright-ecommerce-automation
```

---

## Author

**Tarek Maher**

Software QA Engineer focused on manual testing, test automation, API testing, and end-to-end quality assurance.
