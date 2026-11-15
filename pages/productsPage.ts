import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly createProductButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.createProductButton = page.locator('#jh-create-entity');
  }

  async goto() {
    await this.page.goto('/product');
  }

  async clickCreateProductButton() {
    await this.createProductButton.click();
  }
}