import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/loginPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test(`Verify user is able to register`, async ({ page, request }) => {
  const randomFullName = faker.person.fullName().replace(/[^a-zA-Z0-9]/g, '');
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  const randomPassword = faker.internet.password({ length: 10, memorable: true, pattern: /[A-Za-z0-9]/ });
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goto();

  await test.step(`Fill registration form with random data`, async () => {
    await registrationPage.fill(randomFullName, randomEmail, randomPassword, randomPassword);
    await expect(page.getByRole('alert').filter({ hasText: `Registration saved! Please check your email for confirmation.` })).toBeVisible();
  });

  await test.step('Activate user via API', async () => {
    const authResponse = await request.post('http://localhost:8080/api/authenticate', {
      data: { username: 'admin', password: 'admin', rememberMe: true }
    });

    const { id_token } = await authResponse.json();
    const userResponse = await request.get(`http://localhost:8080/api/admin/users/${randomFullName.toLocaleLowerCase()}`, {
      headers: { Authorization: `Bearer ${id_token}` }
    });

    const userDate = await userResponse.json();
    const userIdValue = userDate.id;

    await page.request.put('/api/admin/users', {
      headers: { Authorization: `Bearer ${id_token}` },
      data: {
        id: userIdValue,
        login: randomFullName,
        activated: true,
        authorities: ['ROLE_USER'],
      },
    });
  });

  await test.step('Verify user is able to login with registered credentials', async () => {
    let loginPage = new LoginPage(page);
    await page.goto('/login');
    await loginPage.login(randomFullName, randomPassword);
    await expect(page.getByRole('alert').filter({ hasText: `You are logged in as user` })).toBeVisible();
  });
});