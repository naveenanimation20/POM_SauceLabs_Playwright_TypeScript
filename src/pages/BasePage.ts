import { Page, Locator, expect } from '@playwright/test';

/**
 * Base page class that provides common functionality for all page objects
 * Contains shared methods for navigation, waiting, and basic interactions
 */
export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for an element to be visible
   * @param locator - The element locator
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForElementVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for an element to be clickable
   * @param locator - The element locator
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForElementClickable(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeEnabled();
  }

  /**
   * Click on an element with wait
   * @param locator - The element locator
   */
  async clickElement(locator: Locator): Promise<void> {
    await this.waitForElementClickable(locator);
    await locator.click();
  }

  /**
   * Fill input field with text
   * @param locator - The input element locator
   * @param text - Text to fill
   */
  async fillInput(locator: Locator, text: string): Promise<void> {
    await this.waitForElementVisible(locator);
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Get text content from an element
   * @param locator - The element locator
   * @returns The text content
   */
  async getElementText(locator: Locator): Promise<string> {
    await this.waitForElementVisible(locator);
    return await locator.textContent() || '';
  }

  /**
   * Verify element is visible
   * @param locator - The element locator
   */
  async verifyElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Verify element contains text
   * @param locator - The element locator
   * @param expectedText - Expected text content
   */
  async verifyElementText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Verify current page URL
   * @param expectedUrl - Expected URL or URL pattern
   */
  async verifyCurrentUrl(expectedUrl: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
