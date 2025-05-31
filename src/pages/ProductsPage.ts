import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Constants } from '../utils/Constants';

/**
 * Page Object Model for SauceDemo Products/Inventory Page
 * Handles product listing, selection, and cart operations
 */
export class ProductsPage extends BasePage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly inventoryContainer: Locator;
  private readonly menuButton: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.inventoryContainer = page.locator('.inventory_container');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  /**
   * Verify products page is loaded
   */
  async verifyProductsPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageTitle);
    await this.verifyElementText(this.pageTitle, 'Products');
    await this.verifyElementVisible(this.inventoryContainer);
    await this.verifyCurrentUrl(Constants.INVENTORY_URL);
  }

  /**
   * Get product locator by product name
   * @param productName - Name of the product
   * @returns Locator for the product container
   */
  private getProductLocator(productName: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  /**
   * Get add to cart button locator for a specific product
   * @param productName - Name of the product
   * @returns Locator for the add to cart button
   */
  private getAddToCartButtonLocator(productName: string): Locator {
    const productLocator = this.getProductLocator(productName);
    return productLocator.locator('button').filter({ hasText: 'Add to cart' });
  }

  /**
   * Get remove button locator for a specific product
   * @param productName - Name of the product
   * @returns Locator for the remove button
   */
  private getRemoveButtonLocator(productName: string): Locator {
    const productLocator = this.getProductLocator(productName);
    return productLocator.locator('button').filter({ hasText: 'Remove' });
  }

  /**
   * Add a specific product to cart
   * @param productName - Name of the product to add
   */
  async addProductToCart(productName: string): Promise<void> {
    const addToCartButton = this.getAddToCartButtonLocator(productName);
    await this.verifyElementVisible(addToCartButton);
    await this.clickElement(addToCartButton);
  }

  /**
   * Add Sauce Labs Backpack to cart
   */
  async addSauceLabsBackpackToCart(): Promise<void> {
    await this.addProductToCart(Constants.SAUCE_LABS_BACKPACK);
  }

  /**
   * Remove a specific product from cart
   * @param productName - Name of the product to remove
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.getRemoveButtonLocator(productName);
    await this.verifyElementVisible(removeButton);
    await this.clickElement(removeButton);
  }

  /**
   * Click on shopping cart to navigate to cart page
   */
  async clickShoppingCart(): Promise<void> {
    await this.clickElement(this.shoppingCartLink);
  }

  /**
   * Get the number of items in cart from the badge
   * @returns Number of items in cart, 0 if badge is not visible
   */
  async getCartItemCount(): Promise<number> {
    try {
      const badgeText = await this.getElementText(this.shoppingCartBadge);
      return parseInt(badgeText) || 0;
    } catch {
      return 0;
    }
  }

  /**
   * Verify cart badge shows expected count
   * @param expectedCount - Expected number of items in cart
   */
  async verifyCartItemCount(expectedCount: number): Promise<void> {
    if (expectedCount > 0) {
      await this.verifyElementVisible(this.shoppingCartBadge);
      await this.verifyElementText(this.shoppingCartBadge, expectedCount.toString());
    }
  }

  /**
   * Verify product is visible on the page
   * @param productName - Name of the product to verify
   */
  async verifyProductVisible(productName: string): Promise<void> {
    const productLocator = this.getProductLocator(productName);
    await this.verifyElementVisible(productLocator);
  }

  /**
   * Verify add to cart button is visible for a product
   * @param productName - Name of the product
   */
  async verifyAddToCartButtonVisible(productName: string): Promise<void> {
    const addToCartButton = this.getAddToCartButtonLocator(productName);
    await this.verifyElementVisible(addToCartButton);
  }

  /**
   * Verify remove button is visible for a product (indicating it's in cart)
   * @param productName - Name of the product
   */
  async verifyRemoveButtonVisible(productName: string): Promise<void> {
    const removeButton = this.getRemoveButtonLocator(productName);
    await this.verifyElementVisible(removeButton);
  }

  /**
   * Get product price by product name
   * @param productName - Name of the product
   * @returns Product price as string
   */
  async getProductPrice(productName: string): Promise<string> {
    const productLocator = this.getProductLocator(productName);
    const priceLocator = productLocator.locator('.inventory_item_price');
    return await this.getElementText(priceLocator);
  }

  /**
   * Get product description by product name
   * @param productName - Name of the product
   * @returns Product description as string
   */
  async getProductDescription(productName: string): Promise<string> {
    const productLocator = this.getProductLocator(productName);
    const descriptionLocator = productLocator.locator('.inventory_item_desc');
    return await this.getElementText(descriptionLocator);
  }

  /**
   * Sort products by specified option
   * @param sortOption - Sort option value (e.g., 'az', 'za', 'lohi', 'hilo')
   */
  async sortProducts(sortOption: string): Promise<void> {
    await this.clickElement(this.sortDropdown);
    await this.page.selectOption(this.sortDropdown, sortOption);
  }

  /**
   * Get all product names currently visible on the page
   * @returns Array of product names
   */
  async getAllProductNames(): Promise<string[]> {
    const productNameLocators = this.page.locator('.inventory_item_name');
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
