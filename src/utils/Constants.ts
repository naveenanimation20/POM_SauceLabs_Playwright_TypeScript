/**
 * Constants used throughout the test framework
 * Contains URLs, test data, and configuration values
 */
export class Constants {
  // Base URLs
  static readonly BASE_URL = 'https://www.saucedemo.com';
  static readonly LOGIN_URL = 'https://www.saucedemo.com/';
  static readonly INVENTORY_URL = 'https://www.saucedemo.com/inventory.html';
  static readonly CART_URL = 'https://www.saucedemo.com/cart.html';
  static readonly CHECKOUT_STEP_ONE_URL = 'https://www.saucedemo.com/checkout-step-one.html';
  static readonly CHECKOUT_STEP_TWO_URL = 'https://www.saucedemo.com/checkout-step-two.html';
  static readonly CHECKOUT_COMPLETE_URL = 'https://www.saucedemo.com/checkout-complete.html';

  // Test Users
  static readonly VALID_USERNAME = 'standard_user';
  static readonly VALID_PASSWORD = 'secret_sauce';

  // Product Names
  static readonly SAUCE_LABS_BACKPACK = 'Sauce Labs Backpack';

  // Success Messages
  static readonly ORDER_COMPLETE_MESSAGE = 'Thank you for your order!';
  static readonly ORDER_COMPLETE_HEADER = 'THANK YOU FOR YOUR ORDER';

  // Error Messages
  static readonly INVALID_CREDENTIALS_ERROR = 'Epic sadface: Username and password do not match any user in this service';
  static readonly MISSING_USERNAME_ERROR = 'Epic sadface: Username is required';
  static readonly MISSING_PASSWORD_ERROR = 'Epic sadface: Password is required';

  // Timeouts
  static readonly DEFAULT_TIMEOUT = 10000;
  static readonly ELEMENT_TIMEOUT = 5000;
  static readonly PAGE_LOAD_TIMEOUT = 30000;
}
