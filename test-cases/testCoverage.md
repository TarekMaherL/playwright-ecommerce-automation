# E-Commerce Automation Test Coverage

## Application Under Test

https://rahulshettyacademy.com/client/

## Coverage Strategy

This test suite follows a risk-based automation approach.

Priority levels:

- **P0** — Critical business flow. Failure blocks core application usage.
- **P1** — Important functional behavior with high regression value.
- **P2** — Lower-risk or secondary functionality.

Test types:

- **Positive** — Valid user behavior.
- **Negative** — Invalid input or invalid application state.
- **Boundary** — Input limits and edge conditions.
- **Regression** — Existing behavior that should remain stable.
- **Smoke** — Critical functionality validated on each important execution.

---

## Authentication

| TC ID | Module | Scenario | Type | Priority | Automation | Expected Result |
|---|---|---|---|---|---|---|
| AUTH-001 | Authentication | Login with valid credentials | Positive / Smoke | P0 | Yes | User is authenticated and redirected to `#/dashboard/dash` |
| AUTH-002 | Authentication | Logout authenticated user | Positive / Smoke | P0 | Yes | User is logged out and returned to the login page |
| AUTH-003 | Authentication | Login with unknown email and valid-format password | Negative | P1 | Yes | `Incorrect email or password.` is displayed and login fails |
| AUTH-004 | Authentication | Login with registered email and incorrect password | Negative | P1 | Yes | `Incorrect email or password.` is displayed and login fails |
| AUTH-005 | Authentication | Login with empty email | Negative | P1 | Yes | `*Email is required` is displayed |
| AUTH-006 | Authentication | Login with empty password | Negative | P1 | Yes | `*Password is required` is displayed |
| AUTH-007 | Authentication | Login with both fields empty | Negative | P1 | Yes | Email and password required validation messages are displayed |
| AUTH-008 | Authentication | Login with invalid email format | Negative | P1 | Yes | `*Enter Valid Email` is displayed and login is not attempted successfully |

---

## Products

| TC ID | Module | Scenario | Type | Priority | Automation | Expected Result |
|---|---|---|---|---|---|---|
| PRODUCT-001 | Products | Product catalog loads after login | Smoke | P0 | Yes | Product listing is displayed after successful login |
| PRODUCT-002 | Products | Product names are displayed | Positive | P1 | Yes | Available products display their names |
| PRODUCT-003 | Products | Product prices are displayed | Positive | P1 | Yes | Available products display their prices |
| PRODUCT-004 | Products | Open product details from catalog | Positive | P1 | Yes | Correct product details page is opened |
| PRODUCT-005 | Products | Product name remains consistent on details page | Regression | P1 | Yes | Selected product name matches the product listing |
| PRODUCT-006 | Products | Product price remains consistent on details page | Regression | P1 | Yes | Selected product price matches the product listing |
| PRODUCT-007 | Products | Add product to cart from catalog | Positive / Smoke | P0 | Yes | Product is added and cart state is updated |
| PRODUCT-008 | Products | Add product to cart from product details | Positive | P1 | Yes | Product is added, success confirmation appears, and cart state is updated |
| PRODUCT-009 | Products | Search for an existing product | Positive | P1 | Yes | Matching product is displayed |
| PRODUCT-010 | Products | Search for a product that does not exist | Negative | P1 | Yes | No matching products are displayed |
| PRODUCT-011 | Products | Filter products by category | Positive | P1 | Yes | Only products matching the selected category are displayed |
| PRODUCT-012 | Products | Filter products by subcategory | Positive | P2 | Yes | Only products matching the selected subcategory are displayed |
| PRODUCT-013 | Products | Filter products by price range | Boundary | P2 | Yes | Products displayed fall within the selected price range |
| PRODUCT-014 | Products | Continue shopping from product details | Positive | P2 | Yes | User returns to the product catalog |

---

## Cart

| TC ID | Module | Scenario | Type | Priority | Automation | Expected Result |
|---|---|---|---|---|---|---|
| CART-001 | Cart | Added product appears in cart | Smoke | P0 | Yes | Selected product is displayed in the cart |
| CART-002 | Cart | Verify product name in cart | Regression | P1 | Yes | Cart product name matches the selected product |
| CART-003 | Cart | Verify product price in cart | Regression | P1 | Yes | Cart product price matches the selected product |
| CART-004 | Cart | Cart badge updates after adding product | Regression | P1 | Yes | Cart badge reflects the number of added products |
| CART-005 | Cart | Verify cart subtotal | Regression | P1 | Yes | Subtotal correctly represents cart contents |
| CART-006 | Cart | Verify cart total | Regression | P1 | Yes | Total correctly represents cart contents |
| CART-007 | Cart | Remove product from cart | Positive | P1 | Yes | Product is removed and cart state updates |
| CART-008 | Cart | Add multiple different products | Positive | P1 | Yes | All selected products appear in the cart |
| CART-009 | Cart | Continue shopping from cart | Positive | P2 | Yes | User returns to product catalog |
| CART-010 | Cart | Navigate from cart to checkout | Smoke | P0 | Yes | Checkout page opens with the selected cart contents |

---

## Checkout

| TC ID | Module | Scenario | Type | Priority | Automation | Expected Result |
|---|---|---|---|---|---|---|
| CHECKOUT-001 | Checkout | Checkout page loads successfully | Smoke | P0 | Yes | Checkout page displays selected order information |
| CHECKOUT-002 | Checkout | Product name remains correct during checkout | Regression | P1 | Yes | Checkout product name matches cart product |
| CHECKOUT-003 | Checkout | Product price remains correct during checkout | Regression | P1 | Yes | Checkout product price matches cart product |
| CHECKOUT-004 | Checkout | Product quantity is displayed | Regression | P1 | Yes | Correct quantity is displayed |
| CHECKOUT-005 | Checkout | Logged-in email is populated | Positive | P1 | Yes | Authenticated user's email is shown in shipping information |
| CHECKOUT-006 | Checkout | Select valid shipping country | Positive / Smoke | P0 | Yes | Selected country is accepted for shipping |
| CHECKOUT-007 | Checkout | Attempt order with missing shipping information | Negative | P1 | Yes | `Please Enter Full Shipping Information` is displayed and order is not created |
| CHECKOUT-008 | Checkout | Successfully place an order | Positive / Smoke | P0 | Yes | Order is submitted successfully and confirmation is displayed |
| CHECKOUT-009 | Checkout | Validate coupon behavior | Positive / Negative | P2 | Later | Coupon behavior is validated after confirming supported application behavior |

---

## Orders

| TC ID | Module | Scenario | Type | Priority | Automation | Expected Result |
|---|---|---|---|---|---|---|
| ORDER-001 | Orders | Order ID is generated after purchase | Smoke | P0 | Yes | Successful purchase generates an order ID |
| ORDER-002 | Orders | Newly created order appears in order history | Smoke | P0 | Yes | Placed order is visible in Orders |
| ORDER-003 | Orders | Locate order using captured order ID | Regression | P0 | Yes | Exact order can be found using its generated ID |
| ORDER-004 | Orders | Open order details | Positive | P1 | Yes | Correct order details page opens |
| ORDER-005 | Orders | Verify purchased product in order | Regression | P1 | Yes | Product matches the product that was purchased |
| ORDER-006 | Orders | Verify order information | Regression | P1 | Yes | Relevant order information matches the submitted order |

---

## Session and Navigation

| TC ID | Module | Scenario | Type | Priority | Automation | Expected Result |
|---|---|---|---|---|---|---|
| SESSION-001 | Session | Sign out authenticated user | Smoke | P0 | Yes | Session ends and login page is displayed |
| SESSION-002 | Session | Access authenticated page after logout | Negative / Regression | P1 | Yes | User cannot continue using authenticated functionality after logout |
| NAV-001 | Navigation | Navigate to Home | Positive | P2 | Yes | Dashboard/product catalog opens |
| NAV-002 | Navigation | Navigate to Orders | Positive | P1 | Yes | Orders page opens |
| NAV-003 | Navigation | Navigate to Cart | Positive | P1 | Yes | Cart page opens |

---

## Main End-to-End Smoke Scenario

### E2E-001 — Customer completes a purchase and verifies the order

Priority: **P0**

Type: **Smoke / Regression**

Flow:

1. Login with valid credentials.
2. Verify dashboard is displayed.
3. Locate a product.
4. Add the product to cart.
5. Verify the cart badge.
6. Open the cart.
7. Verify product name and price.
8. Proceed to checkout.
9. Verify checkout product information.
10. Select a shipping country.
11. Place the order.
12. Capture the generated order ID.
13. Navigate to Orders.
14. Find the order using the captured ID.
15. Open the order details.
16. Verify the purchased product and relevant order information.

---

## Application Observations

During manual exploration, the following behavior was confirmed:

- Authentication uses hash-based routing.
- Successful login redirects to `#/dashboard/dash`.
- Invalid email format displays `*Enter Valid Email`.
- Empty email displays `*Email is required`.
- Empty password displays `*Password is required`.
- Invalid credentials display `Incorrect email or password.`.
- Products support both `View` and `Add To Cart`.
- Product details use a route containing `/dashboard/product-details/`.
- Adding a product displays `Product Added To Cart`.
- Cart navigation displays an item-count badge.
- Cart displays product price, subtotal, and total.
- Checkout displays product summary, payment information, shipping information, and country selection.
- Missing shipping information displays `Please Enter Full Shipping Information`.
- Orders and Sign Out navigation are available to authenticated users.

### Known Application Data Observation

During exploration, the `ADIDAS ORIGINAL` product displayed the description `Apple phone`.

This appears to be an application/demo-data inconsistency. Automation should validate stable business data such as product name, price, cart contents, and order information rather than assuming this description is semantically correct.

---

## Deferred Exploration

The following features are visible but require additional validation before meaningful automated coverage is added:

- PayPal
- SEPA
- Invoice payment options
- Coupon behavior
- Pagination behavior

These features should only be automated if exploration confirms that they provide meaningful and stable application behavior.