import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('/');
})

test('Verify admin is logged in', async ({ page }) => {
  await expect(page.locator('h1.display-4')).toHaveText('Welcome, Java Hipster!');
  await expect(page.locator('.alert.alert-success')).toHaveText('You are logged in as user "admin".');
});
