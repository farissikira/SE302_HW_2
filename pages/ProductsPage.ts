import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) { }

    async navigateToSweets() {
        await this.page.goto('https://sweetshop.netlify.app/sweets');
    }

    productCardsDisplay(): Locator {
        return this.page.locator('.card, .product-card, .sweet-card');
    }

}