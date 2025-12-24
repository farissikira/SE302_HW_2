import { Page, Locator } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    async openPage() {
        await this.page.goto('https://sweetshop.netlify.app/');
    }

    sweetsLink(): Locator {
        return this.page.locator('a.nav-link[href="/sweets"]');
    }

    loginLink(): Locator {
        return this.page.locator('a[href="/login"]');
    }
}
