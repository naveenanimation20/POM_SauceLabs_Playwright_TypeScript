import { Page, Locator } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';
import { Constants } from '../utils/Constants';

/**
 * Page Object Model for SauceDemo Checkout Step Two Page
 * Handles order review and confirmation before final purchase
 */
export class CheckoutStepTwoPage extends CheckoutPage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly summaryInfo: Locator;
  private readonly summarySubtotal: Locator;
  private readonly summaryTax: Locator;
  private readonly summaryTotal: Locator;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;
  private readonly paymentInformation: Locator;
  private readonly shippingInformation: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.summaryInfo = page.locator('.summary_info');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.paymentInformation = page.locator('.summary_value_label').first();
    this.shippingInformation = page.locator('.summary_value_label').last();
  }

  /**
   * Verify checkout step two page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageTitle);
    await this.verifyElementText(this.pageTitle, 'Checkout: Overview');
    await this.verifyCurrentUrl(Constants.CHECKOUT_STEP_TWO_URL);
    await this.verifyOrderSummaryVisible();
  }

  /**
   * Verify order summary section is visible
   */
  private async verifyOrderSummaryVisible(): Promise<void> {
    await this.verifyElementVisible(this.summaryInfo);
    await this.verifyElementVisible(this.finishButton);
    await this.verifyElementVisible(this.cancelButton);
  }

  /**
   * Get cart item locator by product name
   * @param productName - Name of the product
   * @returns Locator for the cart item
   */
  private getCartItemLocator(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  /**
   * Verify product is in the order summary
   * @param productName - Name of the product to verify
   */
  async verifyProductInOrderSummary(productName: string): Promise<void> {
    const cartItemLocator = this.getCartItemLocator(productName);
    await this.verifyElementVisible(cartItemLocator);
  }

  /**
   * Verify Sauce Labs Backpack is in order summary
   */
  async verifySauceLabsBackpackInOrderSummary(): Promise<void> {
    await this.verifyProductInOrderSummary(Constants.SAUCE_LABS_BACKPACK);
  }

  /**
   * Get subtotal amount from summary
   * @returns Subtotal amount as string
   */
  async getSubtotalAmount(): Promise<string> {
    const subtotalText = await this.getElementText(this.summarySubtotal);
    return subtotalText.replace('Item total: ', '');
  }

  /**
   * Get tax amount from summary
   * @returns Tax amount as string
   */
  async getTaxAmount(): Promise<string> {
    const taxText = await this.getElementText(this.summaryTax);
    return taxText.replace('Tax: ', '');
  }

  /**
   * Get total amount from summary
   * @returns Total amount as string
   */
  async getTotalAmount(): Promise<string> {
    const totalText = await this.getElementText(this.summaryTotal);
    return totalText.replace('Total: ', '');
  }

  /**
   * Get payment information
   * @returns Payment information text
   */
  async getPaymentInformation(): Promise<string> {
    return await this.getElementText(this.paymentInformation);
  }

  /**
   * Get shipping information
   * @returns Shipping information text
   */
  async getShippingInformation(): Promise<string> {
    return await this.getElementText(this.shippingInformation);
  }

  /**
   * Click finish button to complete the order
   */
  async clickFinish(): Promise<void> {
    await this.verifyElementVisible(this.finishButton);
    await this.clickElement(this.finishButton);
  }

  /**
   * Click cancel button to return to products page
   */
  async clickCancel(): Promise<void> {
    await this.clickElement(this.cancelButton);
  }

  /**
   * Get the number of items in order summary
   * @returns Number of items in order summary
   */
  async getOrderItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Verify order has expected number of items
   * @param expectedCount - Expected number of items in order
   */
  async verifyOrderItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getOrderItemCount();
    if (actualCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} items in order summary, but found ${actualCount}`);
    }
  }

  /**
   * Get product price from order summary
   * @param productName - Name of the product
   * @returns Product price as string
   */
  async getProductPriceInOrderSummary(productName: string): Promise<string> {
    const cartItemLocator = this.getCartItemLocator(productName);
    const priceLocator = cartItemLocator.locator('.inventory_item_price');
    return await this.getElementText(priceLocator);
  }

  /**
   * Get product quantity from order summary
   * @param productName - Name of the product
   * @returns Product quantity as string
   */
  async getProductQuantityInOrderSummary(productName: string): Promise<string> {
    const cartItemLocator = this.getCartItemLocator(productName);
    const quantityLocator = cartItemLocator.locator('.cart_quantity');
    return await this.getElementText(quantityLocator);
  }

  /**
   * Verify order summary contains all expected information
   */
  async verifyOrderSummaryComplete(): Promise<void> {
    await this.verifyElementVisible(this.summarySubtotal);
    await this.verifyElementVisible(this.summaryTax);
    await this.verifyElementVisible(this.summaryTotal);
    await this.verifyElementVisible(this.paymentInformation);
    await this.verifyElementVisible(this.shippingInformation);
  }

  /**
   * Get all product names in order summary
   * @returns Array of product names in order summary
   */
  async getAllProductNamesInOrderSummary(): Promise<string[]> {
    const productNameLocators = this.cartItems.locator('.inventory_item_name');
    const count = await productNameLocators.count();
    const productNames: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const name = await productNameLocators.nth(i).textContent();
      if (name) {
        productNames.push(name);
      }
    }
    
    return productNames;
  }
}
