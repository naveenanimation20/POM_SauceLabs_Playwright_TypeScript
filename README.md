# POM_SauceLabs_Playwright_TypeScript

This project demonstrates automation testing using Playwright with TypeScript, implementing the Page Object Model (POM) pattern for [Sauce Demo](https://www.saucedemo.com/) website. The project includes test reporting with Allure.

## 🚀 Features

- Page Object Model (POM) implementation
- TypeScript support
- Parallel test execution
- Allure reporting
- Cross-browser testing
- Visual testing capabilities
- GitHub Actions integration

## 🛠️ Prerequisites

- Node.js (Latest LTS version)
- npm (Node Package Manager)
- TypeScript
- Playwright
- Allure Command Line Tool

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/naveenanimation20/POM_SauceLabs_Playwright_TypeScript.git
   cd POM_SauceLabs_Playwright_TypeScript
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🏃‍♂️ Running Tests

Run all tests:
```bash
npm test
```

Run tests in specific browser:
```bash
npx playwright test --browser=chromium
npx playwright test --browser=firefox
npx playwright test --browser=webkit
```

Run tests in UI mode:
```bash
npx playwright test --ui
```

## 📊 Test Reports

Generate and open Allure report:
```bash
npm run allure:generate
npm run allure:open
```

## 📁 Project Structure

```
src/
├── pages/       # Page Object Model classes
└── utils/       # Utility functions and helpers
tests/
└── *.spec.ts    # Test specifications
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Naveen AutomationLabs

---

⭐️ If you found this project helpful, please give it a star!
