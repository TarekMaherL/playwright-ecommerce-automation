# Playwright E-Commerce Automation Framework

[![Playwright Tests](https://github.com/TarekMaherL/playwright-ecommerce-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/TarekMaherL/playwright-ecommerce-automation/actions/workflows/playwright.yml)

A complete end-to-end test automation framework built with **Playwright, JavaScript, and Node.js** for an e-commerce web application.

The project demonstrates practical automation engineering concepts including:

- Page Object Model
- Custom Playwright fixtures
- Worker-scoped authentication
- Parallel execution with isolated test accounts
- UI and REST API testing
- API-assisted UI testing
- Data-driven testing
- Cross-browser testing
- Smoke, regression, negative, API, and E2E tagging
- Dynamic test-data handling
- Playwright reporting and debugging artifacts
- GitHub Actions Continuous Integration
- Secure environment configuration

---

## Application Under Test

**Rahul Shetty Academy E-Commerce Client**

```text
https://rahulshettyacademy.com/client/
```

---

## Repository

```text
https://github.com/TarekMaherL/playwright-ecommerce-automation
```

---

# Tech Stack

- Playwright
- JavaScript
- Node.js
- Playwright Test Runner
- REST API Testing with `APIRequestContext`
- Page Object Model
- Custom Fixtures
- Worker-Scoped Fixtures
- JSON Test Data
- Environment Variables
- Git
- GitHub
- GitHub Actions

---

# Framework Highlights

The framework currently includes:

- 39 unique automated test scenarios
- 107 total test executions across configured Playwright projects
- Chromium, Firefox, and WebKit coverage
- REST API testing
- API-assisted UI testing
- 2 isolated test accounts
- 2 parallel Playwright workers
- Worker-scoped authenticated state
- Page Object Model
- Reusable custom fixtures
- Data-driven testing
- Dynamic Order ID validation
- Smoke and regression execution
- Negative testing
- HTML reports
- Screenshots on failure
- Videos retained on failure
- Playwright traces
- GitHub Actions CI

---

# Framework Architecture

The framework follows a layered design:

```text
Tests
   ↓
Custom Fixtures
   ↓
Page Objects / API Helpers
   ↓
Application UI / REST APIs
```

Each layer has a separate responsibility.

## Tests

Test files contain:

- Business scenarios
- Test data selection
- Assertions
- Test tags

## Page Objects

Page Objects contain:

- Locators
- Page-specific actions
- Reusable UI interactions

Examples:

```text
LoginPage
ProductsPage
ProductDetailsPage
CartPage
CheckoutPage
OrderConfirmationPage
OrdersPage
OrderDetailsPage
```

## Custom Fixtures

Custom fixtures provide Page Object instances and worker-scoped authentication state to tests.

This reduces repeated object creation while keeping test scenarios readable.

## API Helpers

Reusable API authentication logic is kept separately from the UI Page Objects.

This allows API tests and API-assisted UI tests to reuse authentication without duplicating login requests.

---

# Project Structure

```text
playwright-ecommerce-automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── config/
│   └── environment.js
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
├── test-cases/
│   └── testCoverage.md
│
├── tests/
│   ├── api/
│   │   ├── auth.api.spec.js
│   │   └── products.api.spec.js
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
│   │   ├── purchase.spec.js
│   │   └── api-assisted-cart.spec.js
│   │
│   ├── orders/
│   │   └── orders.spec.js
│   │
│   └── products/
│       └── products.spec.js
│
├── utils/
│   └── apiHelpers.js
│
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
```

---

# Automated Test Coverage

## Authentication

Current authentication coverage includes:

- `AUTH-001` Valid login
- `AUTH-002` Logout
- `AUTH-003` Unknown email
- `AUTH-004` Incorrect password
- `AUTH-005` Empty email
- `AUTH-006` Empty password
- `AUTH-007` Empty email and password
- `AUTH-008` Invalid email format

Authentication scenarios perform real UI authentication rather than starting from a pre-authenticated browser state.

Authentication coverage is executed independently on:

- Chromium
- Firefox
- WebKit

---

# Products

Current product coverage includes:

- `PRODUCT-001` Product catalog loads
- `PRODUCT-002` Product names are displayed
- `PRODUCT-003` Product prices are displayed correctly
- `PRODUCT-004` Open product details
- `PRODUCT-005` Product name remains consistent on details page
- `PRODUCT-006` Product price remains consistent on details page
- `PRODUCT-007` Add product to cart from catalog
- `PRODUCT-008` Add product to cart from product details
- `PRODUCT-009` Search for an existing product
- `PRODUCT-010` Search for an unknown product
- `PRODUCT-011` Filter products by category
- `PRODUCT-012` Filter products by subcategory
- `PRODUCT-013` Filter products by gender
- `PRODUCT-014` Filter products by price range
- `PRODUCT-015` Continue Shopping from product details

The framework avoids relying on product position where product identity matters.

Products are located using meaningful business data such as product names.

---

# Cart

Current cart coverage includes:

- `CART-001` Added product appears in cart
- `CART-002` Continue Shopping from cart
- `CART-003` Remove product from cart
- `CART-004` Product price, subtotal, and total validation
- `CART-005` Proceed from cart to checkout

Cart interactions are scoped to the expected product rather than relying on generic indexes.

---

# Checkout

Current checkout coverage includes:

- `CHECKOUT-001` Country is required before placing an order
- `CHECKOUT-002` Successful order placement

Checkout automation includes:

- Country autocomplete handling
- Shipping-information validation
- Order placement
- Order confirmation
- Dynamic Order ID capture

---

# Orders

Current order coverage includes:

- `ORDER-001` Newly created order appears in Order History
- `ORDER-002` Open the created order and validate its details

Order tests dynamically capture the newly generated Order ID.

The framework does not use a hardcoded existing order.

Example flow:

```text
Create Order
     ↓
Capture Order ID
     ↓
Open Order History
     ↓
Find Exact Order ID
     ↓
Open Exact Order
     ↓
Validate Order ID
     ↓
Validate Product
     ↓
Validate Price
```

---

# End-to-End Coverage

## E2E-001 — Complete Purchase Journey

The primary UI E2E scenario validates:

```text
Authenticated User
        ↓
Products
        ↓
Add Product To Cart
        ↓
Cart Validation
        ↓
Price / Subtotal / Total Validation
        ↓
Checkout
        ↓
Select Country
        ↓
Place Order
        ↓
Order Confirmation
        ↓
Capture Dynamic Order ID
        ↓
Order History
        ↓
Find Same Order
        ↓
Open Order Details
        ↓
Validate Order ID
        ↓
Validate Product
        ↓
Validate Price
```

This scenario validates the critical business journey entirely through the user interface.

---

# API Testing

The framework uses Playwright's built-in `APIRequestContext` for REST API testing.

Current API coverage includes:

## API-001 — Valid Login

Validates:

- Successful authentication
- HTTP `200`
- Authentication token
- User ID
- Successful login message

## API-002 — Product Catalog

Validates:

- Authenticated product request
- HTTP `200`
- Product response structure
- Expected product existence
- Product name
- Product price
- Product status

The expected product data is shared with UI tests through:

```text
data/products.json
```

## API-003 — Invalid Password

Validates:

- HTTP `400`
- Authentication rejection
- Expected error message
- No authentication token returned

## API-004 — Missing Authentication Token

Validates that the protected product endpoint rejects a request with no token.

Expected behavior:

```text
401 Unauthorized
```

## API-005 — Invalid Authentication Token

Validates that an invalid token cannot access the protected product catalog.

Expected behavior:

```text
401 Unauthorized
```

---

# API-Assisted UI Testing

The framework also demonstrates hybrid API/UI automation.

## E2E-002 — API-Assisted Cart Validation

The scenario performs:

```text
API Authentication
       ↓
Retrieve Product Through API
       ↓
Add Product To Cart Through API
       ↓
Open Cart UI
       ↓
Validate Product Through UI
```

The API and UI operate using the same worker-specific test account.

This approach allows backend state to be prepared quickly through APIs while still validating user-facing behavior through the browser.

It complements rather than replaces the complete UI E2E journey.

---

# Authentication Architecture

The framework uses **worker-scoped authentication** for authenticated business tests.

Each Playwright worker receives its own dedicated test account.

```text
Worker 0
   ↓
Test Account 1
   ↓
Authenticated Storage State
   ↓
Isolated User Backend State

Worker 1
   ↓
Test Account 2
   ↓
Authenticated Storage State
   ↓
Isolated User Backend State
```

Authentication state is created once per worker and kept in memory.

This provides two important benefits:

- Business tests do not repeat UI login before every scenario.
- Parallel workers do not modify the same user's server-side cart.

Dedicated authentication tests still perform real login and logout operations independently.

---

# Parallel Execution and Test Isolation

The framework currently runs with two isolated test accounts.

The worker count is linked to the available account pool:

```javascript
workers: environment.testAccounts.length
```

With two configured accounts:

```text
2 Test Accounts
       ↓
2 Playwright Workers
       ↓
Independent Auth State
       ↓
Independent Backend Cart State
```

## Race Condition Investigation

During initial parallel execution, multiple workers used the same account.

Because the application stores cart data server-side, concurrent tests could modify the same cart.

For example:

```text
Worker A
→ Add Product

Worker B
→ Remove Same Product

Worker A
→ Validate Product

Result
→ Intermittent Failure
```

The issue was reproduced through repeated parallel execution.

Before account isolation, repeated concurrent execution produced intermittent failures.

After assigning one isolated user to each worker, the same stress scenario completed successfully.

Full regression was then executed successfully with two workers across:

- Chromium
- Firefox
- WebKit

This confirmed that the original issue was test-data isolation rather than a Playwright parallel-execution limitation.

---

# Cross-Browser Testing

The framework supports three browser engines:

- Chromium
- Firefox
- WebKit

Cross-browser validation includes:

- Authentication scenarios
- Product workflows
- Cart workflows
- Checkout workflows
- Order workflows
- Complete E2E scenarios
- API-assisted UI scenarios

API-only tests are maintained in a separate Playwright project because they do not depend on browser rendering engines.

---

# Test Tags

Tests are organized using execution tags.

Current tags include:

```text
@smoke
@regression
@negative
@auth
@api
@e2e
```

A test may belong to multiple execution scopes.

For example:

```text
@smoke @regression
```

means the same test participates in both the critical smoke suite and the larger regression suite.

This avoids duplicating test scenarios.

---

# Smoke Testing

Run the smoke suite:

```bash
npm run test:smoke
```

Smoke coverage contains critical workflows such as:

- Valid login
- Logout
- Product catalog
- Add to cart
- Checkout navigation
- Successful order placement
- Order History
- Complete E2E purchase
- API-assisted cart validation

---

# Regression Testing

Run regression coverage:

```bash
npm run test:regression
```

Regression includes both critical smoke scenarios and broader functional coverage.

---

# Negative Testing

Run negative scenarios:

```bash
npm run test:negative
```

Negative coverage includes:

- Invalid authentication
- Empty authentication fields
- Unknown email
- Incorrect password
- Invalid API authentication
- Missing API token
- Invalid API token
- Required checkout information

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
    },
    "zaraCoat": {
      "name": "ZARA COAT 3",
      "price": 11500
    },
    "iphone13Pro": {
      "name": "IPHONE 13 PRO",
      "price": 55000
    }
  }
}
```

Negative authentication test data is stored separately in:

```text
data/invalidLoginData.json
```

Real credentials are never stored in test-data files.

---

# Environment Configuration

Create a local `.env` file based on `.env.example`.

Required variables:

```env
BASE_URL=https://rahulshettyacademy.com/client/

TEST_EMAIL=
TEST_PASSWORD=

TEST_EMAIL_2=
TEST_PASSWORD_2=
```

The two accounts are used to isolate backend state during parallel execution.

Real credentials must never be committed.

---

# Security Practices

The framework follows several security practices:

- No credentials hardcoded in source code
- `.env` excluded from Git
- GitHub Secrets used for CI credentials
- Authentication tokens are not logged
- Passwords are not stored in test-data JSON
- Generated test artifacts are excluded from Git
- Authentication-state JSON files are excluded defensively
- `.env.example` contains no real secrets

The `.gitignore` protects:

```text
.env
storage/*.json
node_modules/
test-results/
playwright-report/
blob-report/
coverage/
*.log
```

---

# Locator Strategy

The framework prioritizes stable Playwright locators.

Preferred order:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. `getByTestId`
6. Stable CSS selectors when necessary

XPath is avoided unless there is no reasonable alternative.

Locators are scoped to the relevant UI component whenever possible.

Examples include:

- Exact product cards
- Specific cart items
- Exact Order ID rows
- Specific filter sections

This reduces strict-mode violations and accidental matches.

---

# Synchronization Strategy

The framework relies primarily on:

- Playwright auto-waiting
- Web-first assertions
- Element state
- Expected application state

Examples:

```javascript
await expect(locator).toBeVisible();
await expect(locator).toHaveText(...);
await expect(locator).toHaveCount(...);
await expect(page).toHaveURL(...);
```

Arbitrary waits such as:

```javascript
await page.waitForTimeout(5000);
```

are avoided.

For application controls that depend on actual keyboard events, such as some autocomplete and filtering components, `pressSequentially()` is used when required rather than masking the issue with longer timeouts.

---

# Reporting and Debugging

The framework generates Playwright HTML reports.

Configured failure evidence includes:

- Screenshot on failure
- Video retained on failure
- Playwright trace
- Error context
- HTML report

Example configuration:

```javascript
screenshot: 'only-on-failure',
video: 'retain-on-failure',
```

Trace behavior differs between local and CI execution.

Locally, debugging evidence is retained for failures.

In CI, traces are captured according to the retry strategy.

---

# Retry Strategy

Retries are configured differently for development and CI:

```javascript
retries: process.env.CI ? 1 : 0
```

## Local

```text
0 retries
```

Failures remain immediately visible during development and debugging.

## CI

```text
1 retry
```

One retry is allowed for occasional transient infrastructure or network failures.

Retries are not used as a substitute for fixing deterministic failures or flaky tests.

---

# Flaky Test Investigation

During the first GitHub Actions execution, a WebKit price-filter test passed on retry but failed on its initial execution.

The failure showed:

```text
Expected products: 1
Actual products:   3
```

The investigation showed that the filtering interaction had not reliably triggered the expected application behavior in WebKit.

Instead of increasing the assertion timeout, the input interaction was improved to simulate the keyboard behavior expected by the application.

The fix was validated by:

```text
PRODUCT-014 × 10 on WebKit
→ 10/10 passed

Full WebKit regression
→ passed

GitHub Actions CI
→ passed
```

This demonstrates a root-cause approach to flaky-test investigation rather than relying on retries.

---

# Playwright HTML Report

Run tests:

```bash
npm test
```

Open the generated HTML report:

```bash
npm run report
```

or:

```bash
npx playwright show-report
```

The report provides:

- Test results
- Projects
- Browser information
- Execution duration
- Failure details
- Attached evidence

---

# Trace Viewer

When a trace is available:

```bash
npx playwright show-trace path/to/trace.zip
```

Trace Viewer can be used to investigate:

- Test actions
- DOM snapshots
- Locator behavior
- Network requests
- Console messages
- Timing
- Screenshots

---

# Installation

Clone the repository:

```bash
git clone https://github.com/TarekMaherL/playwright-ecommerce-automation.git
```

Enter the project:

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

Create `.env` from `.env.example` and provide the required test-account credentials.

---

# Running Tests

## Complete Framework

```bash
npm test
```

---

## Smoke

```bash
npm run test:smoke
```

---

## Regression

```bash
npm run test:regression
```

---

## Negative Tests

```bash
npm run test:negative
```

---

## API

```bash
npm run test:api
```

---

## Chromium

```bash
npm run test:chromium
```

---

## Firefox

```bash
npm run test:firefox
```

---

## WebKit

```bash
npm run test:webkit
```

---

## HTML Report

```bash
npm run report
```

---

# Continuous Integration

The project is integrated with **GitHub Actions** for Continuous Integration.

Workflow:

```text
.github/workflows/playwright.yml
```

The workflow runs automatically on:

- Push to `main`
- Pull Request targeting `main`
- Manual workflow execution

---

# CI Pipeline

The GitHub Actions pipeline performs:

```text
GitHub Event
      ↓
Create Ubuntu Runner
      ↓
Checkout Repository
      ↓
Setup Node.js
      ↓
npm ci
      ↓
Install Playwright Browsers
      ↓
Install Required Linux Dependencies
      ↓
Inject GitHub Secrets
      ↓
Run Complete Playwright Framework
      ↓
Generate HTML Report
      ↓
Upload Report
      ↓
Upload Failure Artifacts When Required
```

---

# GitHub Secrets

Sensitive values are stored as GitHub Actions Repository Secrets.

Required secrets:

```text
TEST_EMAIL
TEST_PASSWORD
TEST_EMAIL_2
TEST_PASSWORD_2
```

The workflow maps those values to environment variables at runtime.

No real credentials are committed to GitHub.

---

# CI Artifacts

The HTML report is uploaded after every workflow execution.

```text
playwright-report
```

When tests fail, GitHub Actions also uploads:

```text
playwright-test-results
```

which can include:

- Screenshots
- Videos
- Traces
- Error context

This allows CI failures to be investigated without reproducing them immediately on the local machine.

---

# Why This Project Uses Continuous Integration

The application under test is externally hosted.

Therefore, this repository focuses on **Continuous Integration** rather than application deployment.

The CI pipeline automatically validates the test framework after code changes.

The project does not deploy the e-commerce application itself.

---

# NPM Scripts

The project includes standardized execution commands:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:smoke": "playwright test --grep @smoke",
    "test:regression": "playwright test --grep @regression",
    "test:negative": "playwright test --grep @negative",
    "test:api": "playwright test --project=api",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "report": "playwright show-report"
  }
}
```

This provides consistent commands for local development and CI usage.

---

# Engineering Decisions Demonstrated

The framework demonstrates several automation-engineering decisions beyond basic test scripting.

## Page Object Model

Locators and page actions are separated from test scenarios.

## Custom Fixtures

Page Objects and authenticated state are injected through reusable Playwright fixtures.

## Worker-Scoped Authentication

Each parallel worker owns a dedicated test user.

## Test-Data Isolation

Mutable backend cart state is isolated between workers.

## API-Assisted Setup

Backend APIs can prepare test state before focused UI validation.

## Cross-Browser Strategy

Chromium, Firefox, and WebKit are validated independently.

## Test Tagging

The same tests can participate in smoke, regression, API, negative, auth, or E2E execution scopes without duplication.

## Debugging Strategy

Screenshots, videos, traces, HTML reports, and CI artifacts provide evidence for root-cause analysis.

## Secure Configuration

Credentials are stored outside source control locally and through GitHub Secrets in CI.

---

# Current Validation Status

The completed framework has been validated with:

```text
39 unique automated scenarios

107 total executions across:
- API project
- Chromium authentication
- Firefox authentication
- WebKit authentication
- Chromium business tests
- Firefox business tests
- WebKit business tests
```

Parallel business regression has also been validated with:

```text
2 isolated test accounts
2 Playwright workers
```

The complete framework has successfully executed through GitHub Actions CI.

---

# Future Improvements

Potential future improvements include:

- Additional REST API business-flow coverage
- API-based test-data cleanup
- Additional isolated accounts for greater parallel capacity
- Scheduled cross-browser regression execution
- Additional CI quality gates
- Accessibility testing
- Performance testing
- Additional test-environment support

---

# Author

**Tarek Maher**

Software QA Engineer focused on:

- Manual Testing
- Test Automation
- Playwright
- JavaScript
- API Testing
- End-to-End Testing
- Cross-Browser Testing
- CI Integration