import { Page, Locator } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';
import { Constants } from '../utils/Constants';
import { TestData } from '../utils/TestData';

/**
 * Page Object Model for SauceDemo Checkout Step One Page
 * Handles customer information form during checkout process
 */
export class CheckoutStepOnePage extends CheckoutPage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Verify checkout step one page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageTitle);
    await this.verifyElementText(this.pageTitle, 'Checkout: Your Information');
    await this.verifyCurrentUrl(Constants.CHECKOUT_STEP_ONE_URL);
    await this.verifyFormFieldsVisible();
  }

  /**
   * Verify all form fields are visible
   */
  private async verifyFormFieldsVisible(): Promise<void> {
    await this.verifyElementVisible(this.firstNameInput);
    await this.verifyElementVisible(this.lastNameInput);
    await this.verifyElementVisible(this.zipCodeInput);
    await this.verifyElementVisible(this.continueButton);
    await this.verifyElementVisible(this.cancelButton);
  }

  /**
   * Fill first name field
   * @param firstName - First name to enter
   */
  async fillFirstName(firstName: string): Promise<void> {
    await this.fillInput(this.firstNameInput, firstName);
  }

  /**
   * Fill last name field
   * @param lastName - Last name to enter
   */
  async fillLastName(lastName: string): Promise<void> {
    await this.fillInput(this.lastNameInput, lastName);
  }

  /**
   * Fill zip code field
   * @param zipCode - Zip code to enter
   */
  async fillZipCode(zipCode: string): Promise<void> {
    await this.fillInput(this.zipCodeInput, zipCode);
  }

  /**
   * Fill all customer information fields
   * @param firstName - First name
   * @param lastName - Last name
   * @param zipCode - Zip code
   */
  async fillCustomerInformation(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillZipCode(zipCode);
  }

  /**
   * Fill customer information with random data
   */
  async fillRandomCustomerInformation(): Promise<{firstName: string, lastName: string, zipCode: string}> {
    const customerData = TestData.generateCustomerData();
    await this.fillCustomerInformation(
      customerData.firstName,
      customerData.lastName,
      customerData.zipCode
    );
    return customerData;
  }

  /**
   * Click continue button to proceed to next step
   */
  async clickContinue(): Promise<void> {
    await this.verifyElementVisible(this.continueButton);
    await this.clickElement(this.continueButton);
  }

  /**
   * Click cancel button to return to cart
   */
  async clickCancel(): Promise<void> {
    await this.clickElement(this.cancelButton);
  }

  /**
   * Complete the checkout step one process with random data
   * @returns The customer data that was filled
   */
  async completeStepOneWithRandomData(): Promise<{firstName: string, lastName: string, zipCode: string}> {
    const customerData = await this.fillRandomCustomerInformation();
    await this.clickContinue();
    return customerData;
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
   * Get current first name value
   * @returns Current first name input value
   */
  async getFirstNameValue(): Promise<string> {
    return await this.firstNameInput.inputValue();
  }

  /**
   * Get current last name value
   * @returns Current last name input value
   */
  async getLastNameValue(): Promise<string> {
    return await this.lastNameInput.inputValue();
  }

  /**
   * Get current zip code value
   * @returns Current zip code input value
   */
  async getZipCodeValue(): Promise<string> {
    return await this.zipCodeInput.inputValue();
  }

  /**
   * Clear all form fields
   */
  async clearAllFields(): Promise<void> {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.zipCodeInput.clear();
  }

  /**
   * Verify all required fields are filled
   */
  async verifyAllFieldsFilled(): Promise<void> {
    const firstName = await this.getFirstNameValue();
    const lastName = await this.getLastNameValue();
    const zipCode = await this.getZipCodeValue();

    if (!firstName || !lastName || !zipCode) {
      throw new Error('Not all required fields are filled');
    }
  }
}
