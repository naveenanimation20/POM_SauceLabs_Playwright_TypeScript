# Test info

- Name: SauceDemo E-commerce Workflow >> Verify error handling for invalid credentials
- Location: /home/runner/workspace/tests/saucedemo.spec.ts:212:7

# Error details

```
Error: browserType.launch: 
╔══════════════════════════════════════════════════════╗
║ Host system is missing dependencies to run browsers. ║
║ Missing libraries:                                   ║
║     libgtk-3.so.0                                    ║
║     libgdk-3.so.0                                    ║
║     libpangocairo-1.0.so.0                           ║
║     libpango-1.0.so.0                                ║
║     libharfbuzz.so.0                                 ║
║     libcairo-gobject.so.2                            ║
║     libcairo.so.2                                    ║
║     libgdk_pixbuf-2.0.so.0                           ║
║     libicudata.so.66                                 ║
║     libicui18n.so.66                                 ║
║     libatomic.so.1                                   ║
║     libicuuc.so.66                                   ║
║     libxml2.so.2                                     ║
║     libxslt.so.1                                     ║
║     liblcms2.so.2                                    ║
║     libwoff2dec.so.1.0.2                             ║
║     libevent-2.1.so.7                                ║
║     libopus.so.0                                     ║
║     libwebpdemux.so.2                                ║
║     libharfbuzz-icu.so.0                             ║
║     libepoxy.so.0                                    ║
║     libjpeg.so.8                                     ║
║     libwebpmux.so.3                                  ║
║     libwebp.so.6                                     ║
║     libenchant-2.so.2                                ║
║     libsecret-1.so.0                                 ║
║     libhyphen.so.0                                   ║
║     libX11.so.6                                      ║
║     libgbm.so.1                                      ║
║     libEGL.so.1                                      ║
║     libGLX.so.0                                      ║
║     libX11-xcb.so.1                                  ║
║     libxcb.so.1                                      ║
║     libgudev-1.0.so.0                                ║
║     libevdev.so.2                                    ║
║     libdbus-1.so.3                                   ║
║     libjson-glib-1.0.so.0                            ║
║     libGLESv2.so.2                                   ║
║     libx264.so                                       ║
╚══════════════════════════════════════════════════════╝
```

# Test source

```ts
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
  156 |   test('Verify checkout form functionality independently', async ({ page }) => {
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
> 212 |   test('Verify error handling for invalid credentials', async ({ page }) => {
      |       ^ Error: browserType.launch: 
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