import { Page, Locator } from '@playwright/test';

export class NewProductPage {
  readonly page: Page;
  readonly saveButton: Locator;
  readonly nameInput: Locator;
  readonly priceInput: Locator;
  readonly descriptionInput: Locator;
  readonly categorySelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'name' });
    this.priceInput = page.getByRole('textbox', { name: 'price' });
    this.descriptionInput = page.getByRole('textbox', { name: 'description' });
    this.categorySelect = page.getByRole('combobox', { name: 'category' });
    this.saveButton = page.getByRole('button', { name: 'save' });

  }

  async fillAndSubmit(categoryName: string, price: number, description: string, category: string) {
    await this.nameInput.fill(categoryName);
    await this.priceInput.fill(price.toString());
    await this.descriptionInput.fill(description);
    await this.categorySelect.selectOption({ label: category });
    await this.saveButton.click();
  }
}