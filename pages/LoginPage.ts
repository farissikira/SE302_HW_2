import { Page, Locator } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    emailInput(): Locator {
        return this.page.locator('input[type="email"]').first();
    }

    passwordInput(): Locator {
        return this.page.locator('input[type="password"]').first();
    }

    loginButton(): Locator {
        return this.page.locator('button:has-text("Login")').first();
    }

    errorMessageForLogin(): Locator {
        return this.page.locator('.error-message, .alert, .text-danger, .toast-error').first();

    }
}
