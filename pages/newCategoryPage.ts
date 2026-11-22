import { Page, Locator, expect} from '@playwright/test';

export class NewCategoryPage {
  readonly page: Page;
  readonly saveButton: Locator;
  readonly nameInput: Locator;


  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'name' });
    this.saveButton = page.getByRole('button', { name: 'save' });

  }

  async fillAndSubmit(categoryName: string) {
    const responsePromise = this.page.waitForResponse(response => 
      response.url().includes('/api/categories') && response.request().method() === 'POST'
    );
    await this.nameInput.fill(categoryName);
    await this.saveButton.click();
    return await responsePromise;
  }

  async verifyCategoryCreated(categoryName: string) {
      await expect(this.page.getByRole('alert').filter({ hasText: `A new Category is created with identifier ` })).toBeVisible();
      await expect(this.page.getByRole('cell', { name: categoryName })).toBeVisible();
  }
}