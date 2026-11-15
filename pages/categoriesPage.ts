import { Page, Locator } from '@playwright/test';

export class CategoriesPage {
  readonly page: Page;
  readonly createCategoryButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.createCategoryButton = page.locator('#jh-create-entity');
  }

  async goto() {
    await this.page.goto('/category');
  }

  async clickCreateCategoryButton() {
    await this.createCategoryButton.click();
  }
}