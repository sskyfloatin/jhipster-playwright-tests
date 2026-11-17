import { test, expect } from '../fixtures/pageFIxtures';
import { faker } from '@faker-js/faker';
import { activateUserAPI } from '../helpers/activateUserAPI';

test(`Verify user is able to register and login`, async ({ registrationPage, loginPage, request }) => {
  const randomFullName = faker.person.fullName().replace(/[^a-zA-Z0-9]/g, '');
  const randomEmail = `${randomFullName}${faker.number.int(100)}@test.com`
  const randomPassword = faker.internet.password({ length: 10, memorable: true, pattern: /[A-Za-z0-9]/ });
  await registrationPage.goto();

  await test.step(`Fill registration form`, async () => {
    await registrationPage.fill(randomFullName, randomEmail, randomPassword, randomPassword);
    await registrationPage.verifyRegistrationSuccess()
  });

  await test.step('Activate user', async () => {
    const isActivated = await activateUserAPI(request, randomFullName);
    expect(isActivated).toBeTruthy();
  });

  await test.step('Login with registered credentials', async () => {
    await loginPage.goto();
    await loginPage.login(randomFullName, randomPassword);
    await loginPage.verifyLoginSuccess(randomFullName);
  });
});