import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Base Page Object Model for Checkout related pages
 * Provides common functionality for all checkout pages
 */
export abstract class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Abstract method to verify the specific checkout page is loaded
   * Must be implemented by concrete checkout page classes
   */
  abstract verifyPageLoaded(): Promise<void>;
}
