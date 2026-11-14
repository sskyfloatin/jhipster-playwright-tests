import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test(`Verify user is able to log in`, async ({ page }, testInfo) => {
  await page.goto('/login');
  await page.getByRole('textbox', {name: 'username'}).pressSequentially('admin');
  await page.getByRole('textbox', {name: 'password'}).fill('admin');
  await page.getByRole('button', {name: 'Sign In'}).click();
  await expect(page.getByRole('alert').filter({hasText: `You are logged in as user "admin".`})).toBeVisible();
});

test(`Verify user see validation error`, async ({ page }, testInfo) => {
  await page.goto('/login');
  await page.getByRole('textbox', {name: 'username'}).fill('hello');
  await page.getByRole('textbox', {name: 'password'}).fill('world');
  await page.getByRole('button', {name: 'Sign In'}).click();
  await expect(page.getByRole('alert').filter({hasText: `Failed to sign in!`})).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
});
