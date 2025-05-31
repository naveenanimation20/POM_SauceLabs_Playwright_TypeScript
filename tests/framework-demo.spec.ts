import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutStepOnePage } from '../src/pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../src/pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage';
import { Constants } from '../src/utils/Constants';
import { TestData } from '../src/utils/TestData';

/**
 * Framework Demo Test - Demonstrates the POM structure
 * This test validates the Page Object Model framework design
 */
test.describe('POM Framework Demo', () => {
  test('Verify POM framework instantiation and structure', async ({ page }) => {
    // Instantiate all page objects to verify they're properly constructed
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Verify page objects are properly instantiated
    expect(loginPage).toBeDefined();
    expect(productsPage).toBeDefined();
    expect(cartPage).toBeDefined();
    expect(checkoutStepOnePage).toBeDefined();
    expect(checkoutStepTwoPage).toBeDefined();
    expect(checkoutCompletePage).toBeDefined();

    // Verify constants are accessible
    expect(Constants.BASE_URL).toBe('https://www.saucedemo.com');
    expect(Constants.VALID_USERNAME).toBe('standard_user');
    expect(Constants.VALID_PASSWORD).toBe('secret_sauce');
    expect(Constants.SAUCE_LABS_BACKPACK).toBe('Sauce Labs Backpack');
    expect(Constants.ORDER_COMPLETE_MESSAGE).toBe('Thank you for your order!');

    // Verify test data generation
    const customerData = TestData.generateCustomerData();
    expect(customerData.firstName).toBeTruthy();
    expect(customerData.lastName).toBeTruthy();
    expect(customerData.zipCode).toBeTruthy();
    expect(customerData.zipCode).toMatch(/^\d{5}$/);
    
    console.log('Generated test data:', customerData);
  });

  test('Verify page object method availability', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Verify key methods exist on page objects
    expect(typeof loginPage.navigate).toBe('function');
    expect(typeof loginPage.loginWithValidCredentials).toBe('function');
    expect(typeof productsPage.addSauceLabsBackpackToCart).toBe('function');
    expect(typeof cartPage.clickCheckout).toBe('function');
    expect(typeof checkoutStepOnePage.fillRandomCustomerInformation).toBe('function');
    expect(typeof checkoutStepTwoPage.clickFinish).toBe('function');
    expect(typeof checkoutCompletePage.verifyThankYouMessage).toBe('function');
  });
});