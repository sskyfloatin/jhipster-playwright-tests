import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly firstPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly alertBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'username' });
    this.emailInput = page.getByRole('textbox', { name: 'email' });
    this.firstPasswordInput = page.locator('#firstPassword');
    this.confirmPasswordInput = page.locator('#secondPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.alertBanner = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/account/register');
  }

  async fill(username: string, email: string, password: string, confirmPassword: string) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.firstPasswordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.registerButton.click();
  }

  async verifyRegistrationSuccess() {
    await expect(this.page.getByRole('alert').filter({ hasText: `Registration saved!` })).toBeVisible();
  }
}