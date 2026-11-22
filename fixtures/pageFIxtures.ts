import { test as base } from '@playwright/test';
import { CategoriesPage } from '../pages/categoriesPage';
import { NewCategoryPage } from '../pages/newCategoryPage';
import { ProductsPage } from '../pages/productsPage';
import { NewProductPage } from '../pages/newProductPage';
import { RegistrationPage } from '../pages/registrationPage';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { TeardownManager } from '../helpers/teardown';

type myFixtures = {
  categoriesPage: CategoriesPage;
  newCategoryPage: NewCategoryPage;
  productsPage: ProductsPage;
  newProductPage: NewProductPage;
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
  homePage: HomePage;
  teardown: TeardownManager;
};

export const test = base.extend<myFixtures>({
  categoriesPage: async ({ page }, use) => {
    await use(new CategoriesPage(page));
  },
  newCategoryPage: async ({ page }, use) => {
    await use(new NewCategoryPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  newProductPage: async ({ page }, use) => {
    await use(new NewProductPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  teardown: async ({}, use) => {
    await use(new TeardownManager());
  },
});

export { expect } from '@playwright/test';
