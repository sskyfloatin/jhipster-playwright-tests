import {test as base} from '@playwright/test';
import { CategoriesPage } from '../pages/categoriesPage';
import { NewCategoryPage } from '../pages/newCategoryPage';
import { ProductsPage } from '../pages/productsPage';
import { NewProductPage } from '../pages/newProductPage';
import { RegistrationPage } from '../pages/registrationPage';
import { LoginPage } from '../pages/loginPage';

type myFixtures = {
  categoriesPage: CategoriesPage;
  newCategoryPage: NewCategoryPage;
  productsPage: ProductsPage;
  newProductPage: NewProductPage;
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
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
});

export { expect } from '@playwright/test';