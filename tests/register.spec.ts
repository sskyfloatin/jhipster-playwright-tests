import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/loginPage';
import { activateUserAPI } from '../helpers/activateUserAPI';

test(`Verify user is able to register and login`, async ({ page, request }) => {
  const randomFullName = faker.person.fullName().replace(/[^a-zA-Z0-9]/g, '');
  const randomEmail = `${randomFullName}${faker.number.int(100)}@test.com`
  const randomPassword = faker.internet.password({ length: 10, memorable: true, pattern: /[A-Za-z0-9]/ });
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goto();

  await test.step(`Fill registration form`, async () => {
    await registrationPage.fill(randomFullName, randomEmail, randomPassword, randomPassword);
    await expect(page.getByRole('alert').filter({ hasText: `Registration saved!` })).toBeVisible();
  });

  await test.step('Activate user', async () => {
    const isActivated = await activateUserAPI(request, randomFullName);
    expect(isActivated).toBeTruthy();
  });

  await test.step('Login with registered credentials', async () => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    await loginPage.login(randomFullName, randomPassword);
    await expect(page.getByRole('alert').filter({ hasText: `You are logged in as user` })).toBeVisible();
  });
});