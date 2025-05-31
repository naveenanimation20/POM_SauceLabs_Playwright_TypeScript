import { Page, Locator } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';
import { Constants } from '../utils/Constants';

/**
 * Page Object Model for SauceDemo Checkout Complete Page
 * Handles order completion confirmation and success messaging
 */
export class CheckoutCompletePage extends CheckoutPage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly ponyExpressImage: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.ponyExpressImage = page.locator('.pony_express');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Verify checkout complete page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageTitle);
    await this.verifyElementText(this.pageTitle, 'Checkout: Complete!');
    await this.verifyCurrentUrl(Constants.CHECKOUT_COMPLETE_URL);
    await this.verifySuccessElementsVisible();
  }

  /**
   * Verify success elements are visible on the page
   */
  private async verifySuccessElementsVisible(): Promise<void> {
    await this.verifyElementVisible(this.completeHeader);
    await this.verifyElementVisible(this.completeText);
    await this.verifyElementVisible(this.ponyExpressImage);
    await this.verifyElementVisible(this.backHomeButton);
  }

  /**
   * Verify order completion success message
   */
  async verifyOrderCompleteMessage(): Promise<void> {
    await this.verifyElementVisible(this.completeHeader);
    await this.verifyElementText(this.completeHeader, Constants.ORDER_COMPLETE_HEADER);
  }

  /**
   * Verify thank you message
   */
  async verifyThankYouMessage(): Promise<void> {
    await this.verifyElementVisible(this.completeText);
    await this.verifyElementText(this.completeText, Constants.ORDER_COMPLETE_MESSAGE);
  }

  /**
   * Get the complete header text
   * @returns Complete header text
   */
  async getCompleteHeaderText(): Promise<string> {
    return await this.getElementText(this.completeHeader);
  }

  /**
   * Get the complete text message
   * @returns Complete text message
   */
  async getCompleteText(): Promise<string> {
    return await this.getElementText(this.completeText);
  }

  /**
   * Click back home button to return to products page
   */
  async clickBackHome(): Promise<void> {
    await this.verifyElementVisible(this.backHomeButton);
    await this.clickElement(this.backHomeButton);
  }

  /**
   * Verify pony express image is visible (indicates successful order)
   */
  async verifyPonyExpressImageVisible(): Promise<void> {
    await this.verifyElementVisible(this.ponyExpressImage);
  }

  /**
   * Verify complete order success
   * This method checks all success indicators on the page
   */
  async verifyCompleteOrderSuccess(): Promise<void> {
    await this.verifyPageLoaded();
    await this.verifyOrderCompleteMessage();
    await this.verifyThankYouMessage();
    await this.verifyPonyExpressImageVisible();
  }

  /**
   * Verify the complete workflow success message matches expected text
   * @param expectedMessage - Expected success message
   */
  async verifySuccessMessage(expectedMessage: string): Promise<void> {
    const actualMessage = await this.getCompleteText();
    if (!actualMessage.includes(expectedMessage)) {
      throw new Error(`Expected message to contain "${expectedMessage}" but got "${actualMessage}"`);
    }
  }

  /**
   * Complete the order verification and return to home
   */
  async completeOrderAndReturnHome(): Promise<void> {
    await this.verifyCompleteOrderSuccess();
    await this.clickBackHome();
  }
}
