import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Constants } from '../utils/Constants';

/**
 * Page Object Model for SauceDemo Shopping Cart Page
 * Handles cart items display, quantity management, and checkout initiation
 */
export class CartPage extends BasePage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly cartList: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartList = page.locator('.cart_list');
  }

  /**
   * Verify cart page is loaded
   */
  async verifyCartPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageTitle);
    await this.verifyElementText(this.pageTitle, 'Your Cart');
    await this.verifyCurrentUrl(Constants.CART_URL);
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
   * Get remove button locator for a specific cart item
   * @param productName - Name of the product
   * @returns Locator for the remove button
   */
  private getRemoveButtonLocator(productName: string): Locator {
    const cartItemLocator = this.getCartItemLocator(productName);
    return cartItemLocator.locator('button').filter({ hasText: 'Remove' });
  }

  /**
   * Verify product is in cart
   * @param productName - Name of the product to verify
   */
  async verifyProductInCart(productName: string): Promise<void> {
    const cartItemLocator = this.getCartItemLocator(productName);
    await this.verifyElementVisible(cartItemLocator);
  }

  /**
   * Verify Sauce Labs Backpack is in cart
   */
  async verifySauceLabsBackpackInCart(): Promise<void> {
    await this.verifyProductInCart(Constants.SAUCE_LABS_BACKPACK);
  }

  /**
   * Remove product from cart
   * @param productName - Name of the product to remove
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.getRemoveButtonLocator(productName);
    await this.clickElement(removeButton);
  }

  /**
   * Click checkout button to proceed to checkout
   */
  async clickCheckout(): Promise<void> {
    await this.verifyElementVisible(this.checkoutButton);
    await this.clickElement(this.checkoutButton);
  }

  /**
   * Click continue shopping button to return to products page
   */
  async clickContinueShopping(): Promise<void> {
    await this.clickElement(this.continueShoppingButton);
  }

  /**
   * Get the number of items in cart
   * @returns Number of items currently in cart
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Verify cart has expected number of items
   * @param expectedCount - Expected number of items in cart
   */
  async verifyCartItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getCartItemCount();
    if (actualCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} items in cart, but found ${actualCount}`);
    }
  }

  /**
   * Get product price from cart item
   * @param productName - Name of the product
   * @returns Product price as string
   */
  async getProductPriceInCart(productName: string): Promise<string> {
    const cartItemLocator = this.getCartItemLocator(productName);
    const priceLocator = cartItemLocator.locator('.inventory_item_price');
    return await this.getElementText(priceLocator);
  }

  /**
   * Get product quantity from cart item
   * @param productName - Name of the product
   * @returns Product quantity as string
   */
  async getProductQuantityInCart(productName: string): Promise<string> {
    const cartItemLocator = this.getCartItemLocator(productName);
    const quantityLocator = cartItemLocator.locator('.cart_quantity');
    return await this.getElementText(quantityLocator);
  }

  /**
   * Verify cart is empty
   */
  async verifyCartIsEmpty(): Promise<void> {
    const itemCount = await this.getCartItemCount();
    if (itemCount > 0) {
      throw new Error(`Expected cart to be empty, but found ${itemCount} items`);
    }
  }

  /**
   * Get all product names in cart
   * @returns Array of product names in cart
   */
  async getAllProductNamesInCart(): Promise<string[]> {
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

  /**
   * Verify checkout button is visible and enabled
   */
  async verifyCheckoutButtonVisible(): Promise<void> {
    await this.verifyElementVisible(this.checkoutButton);
  }

  /**
   * Verify continue shopping button is visible and enabled
   */
  async verifyContinueShoppingButtonVisible(): Promise<void> {
    await this.verifyElementVisible(this.continueShoppingButton);
  }
}
