import { Page, Locator, expect } from '@playwright/test';

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

  async verifyProductCreated(productName: string) {
    await expect(this.page.getByRole('alert').filter({ hasText: `A new Product is created with identifier ` })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: productName })).toBeVisible();
  }

  async clickCreateProductButton() {
    await this.createProductButton.click();
  }
}