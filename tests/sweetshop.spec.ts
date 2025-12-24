import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Sweet Shop Automated Tests', () => {

    test('TC-01 Page Load', async ({ page }) => {
        const home = new HomePage(page);
        await home.openPage();
        await expect(page).toHaveURL('https://sweetshop.netlify.app/');
        await expect(page.locator('h1').first()).toBeVisible();
    });

    test('TC-02 Navigate to Sweets Page', async ({ page }) => {
        const home = new HomePage(page);
        await home.openPage();
        await home.sweetsLink().click();
        await expect(page).toHaveURL(/sweets/);
    });

    test('TC-03 Login Form (Valid input)', async ({ page }) => {
        const home = new HomePage(page);
        const login = new LoginPage(page);
        await home.openPage();
        await home.loginLink().click();
        await login.emailInput().fill('test@gmail.com');
        await login.passwordInput().fill('test101010');
        await login.loginButton().click();
        await page.waitForLoadState('networkidle');
        await expect(page).not.toHaveURL(/login/);
    });

    test('TC-04 Login Form (Invalid input)', async ({ page }) => {
        const home = new HomePage(page);
        const login = new LoginPage(page);

        await home.openPage();
        await home.loginLink().click();

        await login.emailInput().fill('invalidgmail.com');
        await login.passwordInput().fill('');

        await login.loginButton().click();

        await expect(page).toHaveURL('https://sweetshop.netlify.app/login');

        await expect(home.loginLink()).toBeVisible();

        const error = login.errorMessageForLogin();
        if (await error.count() > 0) {
            await expect(error).toBeVisible();
        }
    });


    test('TC-05 Product Display', async ({ page }) => {
        const products = new ProductsPage(page);
        await products.navigateToSweets();
        const productCards = products.productCardsDisplay();
        await expect(productCards.first()).toBeVisible();
        expect(await productCards.count()).toBe(16);


    });
});
