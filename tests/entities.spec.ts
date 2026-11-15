import { test, expect } from '@playwright/test';
import { CategoriesPage } from '../pages/categoriesPage';
import { NewCategoryPage } from '../pages/newCategoryPage';
import { ProductsPage } from '../pages/productsPage';
import { NewProductPage } from '../pages/newProductPage';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test('Verify admin is able to create category', async ({ page }) => {
  const categoriesPage = new CategoriesPage(page);
  const newCategoryPage = new NewCategoryPage(page);
  const categoryName = faker.word.noun();
  await categoriesPage.goto();
  await categoriesPage.clickCreateCategoryButton();
  await newCategoryPage.fillAndSubmit(categoryName);
  await expect(page.getByRole('alert').filter({ hasText: `A new Category is created with identifier ` })).toBeVisible();
  await expect(page.getByRole('cell', { name: categoryName })).toBeVisible();
});

test('Verify admin is able to create product', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const newProductPage = new NewProductPage(page);
  const productName = faker.commerce.productName();
  const productPrice = parseFloat(faker.commerce.price());
  const productDescription = faker.commerce.productDescription();
  const categoryName = faker.number.int({ min: 1, max: 10 }).toString();
  await productsPage.goto();
  await productsPage.clickCreateProductButton();
  await newProductPage.fillAndSubmit(productName, productPrice, productDescription, categoryName);
  await expect(page.getByRole('alert').filter({ hasText: `A new Product is created with identifier ` })).toBeVisible();
  await expect(page.getByRole('cell', { name: productName })).toBeVisible();
});