import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutStepOnePage } from '../src/pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../src/pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage';
import { Constants } from '../src/utils/Constants';

/**
 * SauceDemo E-commerce Workflow Test Suite
 * Tests the complete user journey from login to order completion
 */
test.describe('SauceDemo E-commerce Workflow', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  /**
   * Setup page objects before each test
   */
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  /**
   * Complete E-commerce Workflow Test
   * Tests the full user journey from login to order completion
   */
  test('Complete SauceDemo e-commerce workflow - Login to Order Completion', async ({ page }) => {
    // Step 1: Open https://www.saucedemo.com/
    await test.step('Navigate to SauceDemo website', async () => {
      await loginPage.navigate();
      await loginPage.verifyLoginPageLoaded();
    });

    // Step 2: Login with username and password
    await test.step('Login with valid credentials', async () => {
      await loginPage.loginWithValidCredentials();
      await loginPage.verifySuccessfulLogin();
    });

    // Step 3: Add product "Sauce Labs Backpack" into the cart
    await test.step('Add Sauce Labs Backpack to cart', async () => {
      await productsPage.verifyProductsPageLoaded();
      await productsPage.verifyProductVisible(Constants.SAUCE_LABS_BACKPACK);
      await productsPage.addSauceLabsBackpackToCart();
      await productsPage.verifyCartItemCount(1);
      await productsPage.verifyRemoveButtonVisible(Constants.SAUCE_LABS_BACKPACK);
    });

    // Step 4: Open the cart
    await test.step('Navigate to shopping cart', async () => {
      await productsPage.clickShoppingCart();
      await cartPage.verifyCartPageLoaded();
      await cartPage.verifySauceLabsBackpackInCart();
      await cartPage.verifyCartItemCount(1);
    });

    // Step 5: Click on Checkout button
    await test.step('Proceed to checkout', async () => {
      await cartPage.verifyCheckoutButtonVisible();
      await cartPage.clickCheckout();
      await checkoutStepOnePage.verifyPageLoaded();
    });

    // Step 6: Fill random data in First Name, Last Name and Zip
    await test.step('Fill customer information with random data', async () => {
      const customerData = await checkoutStepOnePage.fillRandomCustomerInformation();
      await checkoutStepOnePage.verifyAllFieldsFilled();
      
      // Log the generated customer data for reference
      console.log('Generated Customer Data:', {
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        zipCode: customerData.zipCode
      });
    });

    // Step 7: Click on continue button
    await test.step('Continue to order review', async () => {
      await checkoutStepOnePage.clickContinue();
      await checkoutStepTwoPage.verifyPageLoaded();
      await checkoutStepTwoPage.verifySauceLabsBackpackInOrderSummary();
      await checkoutStepTwoPage.verifyOrderItemCount(1);
    });

    // Step 8: Click on Finish button
    await test.step('Complete the order', async () => {
      await checkoutStepTwoPage.verifyOrderSummaryComplete();
      await checkoutStepTwoPage.clickFinish();
      await checkoutCompletePage.verifyPageLoaded();
    });

    // Step 9: Verify message "Thank you for your order"
    await test.step('Verify order completion success message', async () => {
      await checkoutCompletePage.verifyCompleteOrderSuccess();
      await checkoutCompletePage.verifySuccessMessage(Constants.ORDER_COMPLETE_MESSAGE);
      await checkoutCompletePage.verifyThankYouMessage();
      await checkoutCompletePage.verifyOrderCompleteMessage();
    });

    // Additional verification: Complete the workflow by returning home
    await test.step('Return to products page', async () => {
      await checkoutCompletePage.clickBackHome();
      await productsPage.verifyProductsPageLoaded();
    });
  });

  /**
   * Test individual workflow steps for better debugging
   */
  test('Verify login functionality independently', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.verifyLoginPageLoaded();
    await loginPage.loginWithValidCredentials();
    await loginPage.verifySuccessfulLogin();
    await productsPage.verifyProductsPageLoaded();
  });

  test('Verify product addition to cart independently', async ({ page }) => {
    // Login first
    await loginPage.navigate();
    await loginPage.loginWithValidCredentials();
    await productsPage.verifyProductsPageLoaded();
    
    // Test product addition
    await productsPage.verifyProductVisible(Constants.SAUCE_LABS_BACKPACK);
    await productsPage.addSauceLabsBackpackToCart();
    await productsPage.verifyCartItemCount(1);
    await productsPage.verifyRemoveButtonVisible(Constants.SAUCE_LABS_BACKPACK);
  });

  test('Verify cart functionality independently', async ({ page }) => {
    // Setup: Login and add product
    await loginPage.navigate();
    await loginPage.loginWithValidCredentials();
    await productsPage.addSauceLabsBackpackToCart();
    
    // Test cart functionality
    await productsPage.clickShoppingCart();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifySauceLabsBackpackInCart();
    await cartPage.verifyCartItemCount(1);
    await cartPage.verifyCheckoutButtonVisible();
  });

  test('Verify checkout form functionality independently', async ({ page }) => {
    // Setup: Login, add product, navigate to checkout
    await loginPage.navigate();
    await loginPage.loginWithValidCredentials();
    await productsPage.addSauceLabsBackpackToCart();
    await productsPage.clickShoppingCart();
    await cartPage.clickCheckout();
    
    // Test checkout form
    await checkoutStepOnePage.verifyPageLoaded();
    const customerData = await checkoutStepOnePage.fillRandomCustomerInformation();
    await checkoutStepOnePage.verifyAllFieldsFilled();
    
    // Verify the form was filled correctly
    expect(await checkoutStepOnePage.getFirstNameValue()).toBe(customerData.firstName);
    expect(await checkoutStepOnePage.getLastNameValue()).toBe(customerData.lastName);
    expect(await checkoutStepOnePage.getZipCodeValue()).toBe(customerData.zipCode);
  });

  test('Verify order review functionality independently', async ({ page }) => {
    // Setup: Complete flow up to order review
    await loginPage.navigate();
    await loginPage.loginWithValidCredentials();
    await productsPage.addSauceLabsBackpackToCart();
    await productsPage.clickShoppingCart();
    await cartPage.clickCheckout();
    await checkoutStepOnePage.completeStepOneWithRandomData();
    
    // Test order review
    await checkoutStepTwoPage.verifyPageLoaded();
    await checkoutStepTwoPage.verifySauceLabsBackpackInOrderSummary();
    await checkoutStepTwoPage.verifyOrderItemCount(1);
    await checkoutStepTwoPage.verifyOrderSummaryComplete();
    
    // Verify order details
    const subtotal = await checkoutStepTwoPage.getSubtotalAmount();
    const tax = await checkoutStepTwoPage.getTaxAmount();
    const total = await checkoutStepTwoPage.getTotalAmount();
    
    expect(subtotal).toBeTruthy();
    expect(tax).toBeTruthy();
    expect(total).toBeTruthy();
  });

  /**
   * Negative test cases for better coverage
   */
  test('Verify error handling for empty login fields', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.verifyLoginPageLoaded();
    
    // Try to login with empty fields
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage(Constants.MISSING_USERNAME_ERROR);
  });

  test('Verify error handling for invalid credentials', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.verifyLoginPageLoaded();
    
    // Try to login with invalid credentials
    await loginPage.login('invalid_user', 'invalid_password');
    await loginPage.verifyErrorMessage(Constants.INVALID_CREDENTIALS_ERROR);
  });

  test('Verify error handling for empty checkout form', async ({ page }) => {
    // Setup: Login, add product, navigate to checkout
    await loginPage.navigate();
    await loginPage.loginWithValidCredentials();
    await productsPage.addSauceLabsBackpackToCart();
    await productsPage.clickShoppingCart();
    await cartPage.clickCheckout();
    await checkoutStepOnePage.verifyPageLoaded();
    
    // Try to continue with empty form
    await checkoutStepOnePage.clickContinue();
    await checkoutStepOnePage.verifyErrorMessage('Error: First Name is required');
  });
});
