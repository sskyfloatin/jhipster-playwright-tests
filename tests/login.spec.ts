import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page); 
  await loginPage.goto();
});

test(`Verify user is able to log in`, async ({ page }, testInfo) => {
  await loginPage.login('admin', 'admin');
  await expect(page.getByRole('alert').filter({hasText: `You are logged in as user "admin".`})).toBeVisible();
});

test(`Verify user see validation error`, async ({ page }, testInfo) => {
  await loginPage.login('hello', 'world');
  await expect(page.getByRole('alert').filter({hasText: `Failed to sign in!`})).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
});
