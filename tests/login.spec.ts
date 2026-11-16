import { test } from '../fixtures/pageFIxtures'


test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test(`Verify user is able to log in`, async ({ loginPage }) => {
  await loginPage.login('admin', 'admin');
  await loginPage.verifyLoginSuccess();
});

test(`Verify user see validation error`, async ({ loginPage }, testInfo) => {
  await loginPage.login('hello', 'world');
  await loginPage.verifyLoginFailure()
});