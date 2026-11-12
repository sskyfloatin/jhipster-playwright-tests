import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test(`Verify user is able to log in`, async ({ page }, testInfo) => {
  await expect(page.locator('h1.display-4')).toHaveText('Welcome, Java Hipster!');
  await expect(page.locator('.alert.alert-success')).toHaveText(`You are logged in as user "${testInfo.project.name}".`);
});
