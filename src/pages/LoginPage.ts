import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Constants } from '../utils/Constants';

/**
 * Page Object Model for SauceDemo Login Page
 * Handles login functionality and related interactions
 */
export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly loginLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator('.login_logo');
  }

  /**
   * Navigate to the login page
   */
  async navigate(): Promise<void> {
    await this.navigateTo(Constants.LOGIN_URL);
    await this.waitForPageLoad();
  }

  /**
   * Verify login page is loaded
   */
  async verifyLoginPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.loginLogo);
    await this.verifyElementVisible(this.usernameInput);
    await this.verifyElementVisible(this.passwordInput);
    await this.verifyElementVisible(this.loginButton);
  }

  /**
   * Enter username in the username field
   * @param username - The username to enter
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
  }

  /**
   * Enter password in the password field
   * @param password - The password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /**
   * Perform complete login process
   * @param username - The username to login with
   * @param password - The password to login with
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Login with valid credentials
   */
  async loginWithValidCredentials(): Promise<void> {
    await this.login(Constants.VALID_USERNAME, Constants.VALID_PASSWORD);
  }

  /**
   * Verify error message is displayed
   * @param expectedMessage - Expected error message text
   */
  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await this.verifyElementVisible(this.errorMessage);
    await this.verifyElementText(this.errorMessage, expectedMessage);
  }

  /**
   * Verify successful login by checking URL redirection
   */
  async verifySuccessfulLogin(): Promise<void> {
    await this.verifyCurrentUrl(Constants.INVENTORY_URL);
  }

  /**
   * Clear login form fields
   */
  async clearLoginForm(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Get current username value
   * @returns Current username input value
   */
  async getUsernameValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get current password value
   * @returns Current password input value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }
}
