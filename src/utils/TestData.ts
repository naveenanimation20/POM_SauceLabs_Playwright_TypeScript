/**
 * Test data generator utility
 * Provides methods to generate random test data for forms
 */
export class TestData {
  /**
   * Generate a random first name
   * @returns Random first name
   */
  static generateFirstName(): string {
    const firstNames = [
      'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa',
      'James', 'Maria', 'William', 'Jennifer', 'Richard', 'Patricia', 'Charles'
    ];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }

  /**
   * Generate a random last name
   * @returns Random last name
   */
  static generateLastName(): string {
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
      'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez'
    ];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  /**
   * Generate a random ZIP code
   * @returns Random ZIP code (5 digits)
   */
  static generateZipCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  /**
   * Generate random customer data for checkout
   * @returns Object containing random customer information
   */
  static generateCustomerData(): {
    firstName: string;
    lastName: string;
    zipCode: string;
  } {
    return {
      firstName: this.generateFirstName(),
      lastName: this.generateLastName(),
      zipCode: this.generateZipCode()
    };
  }

  /**
   * Generate a random email address
   * @returns Random email address
   */
  static generateEmail(): string {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const randomString = Math.random().toString(36).substring(2, 10);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${randomString}@${domain}`;
  }

  /**
   * Generate a random phone number
   * @returns Random phone number (US format)
   */
  static generatePhoneNumber(): string {
    const areaCode = Math.floor(200 + Math.random() * 800).toString();
    const firstThree = Math.floor(200 + Math.random() * 800).toString();
    const lastFour = Math.floor(1000 + Math.random() * 9000).toString();
    return `(${areaCode}) ${firstThree}-${lastFour}`;
  }
}
