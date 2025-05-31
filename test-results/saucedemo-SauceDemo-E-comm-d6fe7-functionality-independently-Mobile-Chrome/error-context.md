# Test info

- Name: SauceDemo E-commerce Workflow >> Verify checkout form functionality independently
- Location: /home/runner/workspace/tests/saucedemo.spec.ts:156:7

# Error details

```
Error: browserType.launch: 
╔══════════════════════════════════════════════════════╗
║ Host system is missing dependencies to run browsers. ║
║ Please install them with the following command:      ║
║                                                      ║
║     sudo npx playwright install-deps                 ║
║                                                      ║
║ Alternatively, use apt:                              ║
║     sudo apt-get install libglib2.0-0\               ║
║         libnss3\                                     ║
║         libnspr4\                                    ║
║         libdbus-1-3\                                 ║
║         libatk1.0-0\                                 ║
║         libatk-bridge2.0-0\                          ║
║         libatspi2.0-0\                               ║
║         libx11-6\                                    ║
║         libxcomposite1\                              ║
║         libxdamage1\                                 ║
║         libxext6\                                    ║
║         libxfixes3\                                  ║
║         libxrandr2\                                  ║
║         libgbm1\                                     ║
║         libxcb1\                                     ║
║         libxkbcommon0\                               ║
║         libasound2                                   ║
║                                                      ║
║ <3 Playwright Team                                   ║
╚══════════════════════════════════════════════════════╝
```

# Test source

```ts
   56 |       await productsPage.verifyCartItemCount(1);
   57 |       await productsPage.verifyRemoveButtonVisible(Constants.SAUCE_LABS_BACKPACK);
   58 |     });
   59 |
   60 |     // Step 4: Open the cart
   61 |     await test.step('Navigate to shopping cart', async () => {
   62 |       await productsPage.clickShoppingCart();
   63 |       await cartPage.verifyCartPageLoaded();
   64 |       await cartPage.verifySauceLabsBackpackInCart();
   65 |       await cartPage.verifyCartItemCount(1);
   66 |     });
   67 |
   68 |     // Step 5: Click on Checkout button
   69 |     await test.step('Proceed to checkout', async () => {
   70 |       await cartPage.verifyCheckoutButtonVisible();
   71 |       await cartPage.clickCheckout();
   72 |       await checkoutStepOnePage.verifyPageLoaded();
   73 |     });
   74 |
   75 |     // Step 6: Fill random data in First Name, Last Name and Zip
   76 |     await test.step('Fill customer information with random data', async () => {
   77 |       const customerData = await checkoutStepOnePage.fillRandomCustomerInformation();
   78 |       await checkoutStepOnePage.verifyAllFieldsFilled();
   79 |       
   80 |       // Log the generated customer data for reference
   81 |       console.log('Generated Customer Data:', {
   82 |         firstName: customerData.firstName,
   83 |         lastName: customerData.lastName,
   84 |         zipCode: customerData.zipCode
   85 |       });
   86 |     });
   87 |
   88 |     // Step 7: Click on continue button
   89 |     await test.step('Continue to order review', async () => {
   90 |       await checkoutStepOnePage.clickContinue();
   91 |       await checkoutStepTwoPage.verifyPageLoaded();
   92 |       await checkoutStepTwoPage.verifySauceLabsBackpackInOrderSummary();
   93 |       await checkoutStepTwoPage.verifyOrderItemCount(1);
   94 |     });
   95 |
   96 |     // Step 8: Click on Finish button
   97 |     await test.step('Complete the order', async () => {
   98 |       await checkoutStepTwoPage.verifyOrderSummaryComplete();
   99 |       await checkoutStepTwoPage.clickFinish();
  100 |       await checkoutCompletePage.verifyPageLoaded();
  101 |     });
  102 |
  103 |     // Step 9: Verify message "Thank you for your order"
  104 |     await test.step('Verify order completion success message', async () => {
  105 |       await checkoutCompletePage.verifyCompleteOrderSuccess();
  106 |       await checkoutCompletePage.verifySuccessMessage(Constants.ORDER_COMPLETE_MESSAGE);
  107 |       await checkoutCompletePage.verifyThankYouMessage();
  108 |       await checkoutCompletePage.verifyOrderCompleteMessage();
  109 |     });
  110 |
  111 |     // Additional verification: Complete the workflow by returning home
  112 |     await test.step('Return to products page', async () => {
  113 |       await checkoutCompletePage.clickBackHome();
  114 |       await productsPage.verifyProductsPageLoaded();
  115 |     });
  116 |   });
  117 |
  118 |   /**
  119 |    * Test individual workflow steps for better debugging
  120 |    */
  121 |   test('Verify login functionality independently', async ({ page }) => {
  122 |     await loginPage.navigate();
  123 |     await loginPage.verifyLoginPageLoaded();
  124 |     await loginPage.loginWithValidCredentials();
  125 |     await loginPage.verifySuccessfulLogin();
  126 |     await productsPage.verifyProductsPageLoaded();
  127 |   });
  128 |
  129 |   test('Verify product addition to cart independently', async ({ page }) => {
  130 |     // Login first
  131 |     await loginPage.navigate();
  132 |     await loginPage.loginWithValidCredentials();
  133 |     await productsPage.verifyProductsPageLoaded();
  134 |     
  135 |     // Test product addition
  136 |     await productsPage.verifyProductVisible(Constants.SAUCE_LABS_BACKPACK);
  137 |     await productsPage.addSauceLabsBackpackToCart();
  138 |     await productsPage.verifyCartItemCount(1);
  139 |     await productsPage.verifyRemoveButtonVisible(Constants.SAUCE_LABS_BACKPACK);
  140 |   });
  141 |
  142 |   test('Verify cart functionality independently', async ({ page }) => {
  143 |     // Setup: Login and add product
  144 |     await loginPage.navigate();
  145 |     await loginPage.loginWithValidCredentials();
  146 |     await productsPage.addSauceLabsBackpackToCart();
  147 |     
  148 |     // Test cart functionality
  149 |     await productsPage.clickShoppingCart();
  150 |     await cartPage.verifyCartPageLoaded();
  151 |     await cartPage.verifySauceLabsBackpackInCart();
  152 |     await cartPage.verifyCartItemCount(1);
  153 |     await cartPage.verifyCheckoutButtonVisible();
  154 |   });
  155 |
> 156 |   test('Verify checkout form functionality independently', async ({ page }) => {
      |       ^ Error: browserType.launch: 
  157 |     // Setup: Login, add product, navigate to checkout
  158 |     await loginPage.navigate();
  159 |     await loginPage.loginWithValidCredentials();
  160 |     await productsPage.addSauceLabsBackpackToCart();
  161 |     await productsPage.clickShoppingCart();
  162 |     await cartPage.clickCheckout();
  163 |     
  164 |     // Test checkout form
  165 |     await checkoutStepOnePage.verifyPageLoaded();
  166 |     const customerData = await checkoutStepOnePage.fillRandomCustomerInformation();
  167 |     await checkoutStepOnePage.verifyAllFieldsFilled();
  168 |     
  169 |     // Verify the form was filled correctly
  170 |     expect(await checkoutStepOnePage.getFirstNameValue()).toBe(customerData.firstName);
  171 |     expect(await checkoutStepOnePage.getLastNameValue()).toBe(customerData.lastName);
  172 |     expect(await checkoutStepOnePage.getZipCodeValue()).toBe(customerData.zipCode);
  173 |   });
  174 |
  175 |   test('Verify order review functionality independently', async ({ page }) => {
  176 |     // Setup: Complete flow up to order review
  177 |     await loginPage.navigate();
  178 |     await loginPage.loginWithValidCredentials();
  179 |     await productsPage.addSauceLabsBackpackToCart();
  180 |     await productsPage.clickShoppingCart();
  181 |     await cartPage.clickCheckout();
  182 |     await checkoutStepOnePage.completeStepOneWithRandomData();
  183 |     
  184 |     // Test order review
  185 |     await checkoutStepTwoPage.verifyPageLoaded();
  186 |     await checkoutStepTwoPage.verifySauceLabsBackpackInOrderSummary();
  187 |     await checkoutStepTwoPage.verifyOrderItemCount(1);
  188 |     await checkoutStepTwoPage.verifyOrderSummaryComplete();
  189 |     
  190 |     // Verify order details
  191 |     const subtotal = await checkoutStepTwoPage.getSubtotalAmount();
  192 |     const tax = await checkoutStepTwoPage.getTaxAmount();
  193 |     const total = await checkoutStepTwoPage.getTotalAmount();
  194 |     
  195 |     expect(subtotal).toBeTruthy();
  196 |     expect(tax).toBeTruthy();
  197 |     expect(total).toBeTruthy();
  198 |   });
  199 |
  200 |   /**
  201 |    * Negative test cases for better coverage
  202 |    */
  203 |   test('Verify error handling for empty login fields', async ({ page }) => {
  204 |     await loginPage.navigate();
  205 |     await loginPage.verifyLoginPageLoaded();
  206 |     
  207 |     // Try to login with empty fields
  208 |     await loginPage.clickLoginButton();
  209 |     await loginPage.verifyErrorMessage(Constants.MISSING_USERNAME_ERROR);
  210 |   });
  211 |
  212 |   test('Verify error handling for invalid credentials', async ({ page }) => {
  213 |     await loginPage.navigate();
  214 |     await loginPage.verifyLoginPageLoaded();
  215 |     
  216 |     // Try to login with invalid credentials
  217 |     await loginPage.login('invalid_user', 'invalid_password');
  218 |     await loginPage.verifyErrorMessage(Constants.INVALID_CREDENTIALS_ERROR);
  219 |   });
  220 |
  221 |   test('Verify error handling for empty checkout form', async ({ page }) => {
  222 |     // Setup: Login, add product, navigate to checkout
  223 |     await loginPage.navigate();
  224 |     await loginPage.loginWithValidCredentials();
  225 |     await productsPage.addSauceLabsBackpackToCart();
  226 |     await productsPage.clickShoppingCart();
  227 |     await cartPage.clickCheckout();
  228 |     await checkoutStepOnePage.verifyPageLoaded();
  229 |     
  230 |     // Try to continue with empty form
  231 |     await checkoutStepOnePage.clickContinue();
  232 |     await checkoutStepOnePage.verifyErrorMessage('Error: First Name is required');
  233 |   });
  234 | });
  235 |
```