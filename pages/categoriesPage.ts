import { th } from '@faker-js/faker';
import { Page, Locator, expect } from '@playwright/test';

export class CategoriesPage {
  readonly page: Page;
  readonly createCategoryButton: Locator;
  readonly sortByIdUp: Locator;
  readonly sortByIdDown: Locator;
  readonly sortByNameDown: Locator;
  readonly sortByName: Locator;
  readonly nameHeader: Locator;
  readonly tableRows: Locator;


  constructor(page: Page) {
    this.page = page;
    this.createCategoryButton = page.locator('#jh-create-entity');
    this.sortByIdUp = page.locator('.hand', { hasText: 'Id' }).locator('.fa-sort-up');
    this.sortByIdDown = page.locator('.hand', { hasText: 'Id' }).locator('.fa-sort-down');
    this.sortByNameDown = page.locator('.hand', { hasText: 'Name' }).locator('.fa-sort-down');
    this.sortByName = page.locator('.hand', { hasText: 'Name' }).locator('.fa-sort');
    this.nameHeader = page.getByRole('button', { name: /name/i });
    this.tableRows = page.locator('tr[data-cy="entityTable"]');
  }

  async goto() {
    await this.page.goto('/category');
  }

  async clickCreateCategoryButton() {
    await this.createCategoryButton.click();
  }

  async clickSortByName() {
    await this.sortByName.click();
    await expect(this.sortByName).toBeHidden();
  }

  async clickSortByIDUp() {
    await this.sortByIdUp.click();
    await expect(this.sortByIdUp).toBeHidden();
  }

  async clickSortByIDDown() {
    await this.sortByIdDown.click();
    await expect(this.sortByIdDown).toBeHidden();
  }

  async clickSortByNameDown() {
    await this.sortByNameDown.click();
    await expect(this.sortByNameDown).toBeHidden();
  }

  async getColumnValues(columnIndex: number): Promise<string[]> {
    await this.tableRows.first().waitFor();

    const rows = await this.tableRows.all();
    const values: string[] = [];

    for (const row of rows) {
      const cellText = await row.locator('td').nth(columnIndex).innerText();
      values.push(cellText.trim());
    }

    return values;
  }
}