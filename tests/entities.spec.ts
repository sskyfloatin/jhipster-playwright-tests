import { test } from '../fixtures/pageFIxtures';
import { faker } from '@faker-js/faker';


test('Verify admin is able to create category', async ({ categoriesPage, newCategoryPage }) => {
  const categoryName = faker.word.noun();
  await categoriesPage.goto();
  await categoriesPage.clickCreateCategoryButton();
  await newCategoryPage.fillAndSubmit(categoryName);
  await newCategoryPage.verifyCategoryCreated(categoryName);
});

test('Verify admin is able to create product', async ({ productsPage, newProductPage }) => {
  const productName = faker.commerce.productName();
  const productPrice = parseFloat(faker.commerce.price());
  const productDescription = faker.commerce.productDescription();
  const categoryName = faker.number.int({ min: 1, max: 10 }).toString();
  await productsPage.goto();
  await productsPage.clickCreateProductButton();
  await newProductPage.fillAndSubmit(productName, productPrice, productDescription, categoryName);
  await newProductPage.verifyProductCreated(productName);
});