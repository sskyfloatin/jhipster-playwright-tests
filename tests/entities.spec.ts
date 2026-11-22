import { test, expect } from '../fixtures/pageFIxtures'
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test.afterEach(async ({ request, teardown }) => {
  await teardown.cleanup(request);
});

test.describe('Entities management ', () => {

  test('Verify admin is able to create category', async ({ newCategoryPage, categoriesPage, teardown }) => {
    const categoryName = faker.word.noun();
    await categoriesPage.goto();
    await categoriesPage.clickCreateCategoryButton();
    const response = await newCategoryPage.fillAndSubmit(categoryName);
    const category = await response.json();
    teardown.track('category', category.id);
    await newCategoryPage.verifyCategoryCreated(categoryName);
  });

  test('Verify admin is able to create product', async ({ productsPage, newProductPage, teardown }) => {
    const productName = faker.commerce.productName();
    const productPrice = parseFloat(faker.commerce.price());
    const productDescription = faker.commerce.productDescription();
    const categoryName = faker.number.int({ min: 1, max: 10 }).toString();
    await productsPage.goto();
    await productsPage.clickCreateProductButton();
    const response = await newProductPage.fillAndSubmit(productName, productPrice, productDescription, categoryName);
    const product = await response.json();
    teardown.track('product', product.id);
    await newProductPage.verifyProductCreated(productName);
  });

  test('Verify Categories sort by Name', async ({ categoriesPage }) => {
    await categoriesPage.goto();
    await categoriesPage.clickSortByName();
    const namesDescending = await categoriesPage.getColumnValues(1);
    const sortedNamesDescending = [...namesDescending].sort((a, b) => b.localeCompare(a));
    expect(namesDescending).toEqual(sortedNamesDescending);

    await categoriesPage.clickSortByNameDown();
    const namesAscending = await categoriesPage.getColumnValues(1);
    const sortedNamesAscending = [...namesAscending].sort((a, b) => a.localeCompare(b));
    expect(namesAscending).toEqual(sortedNamesAscending);
  });

  test('Verify Categories sort by ID', async ({ categoriesPage }) => {
    await categoriesPage.goto();
    await categoriesPage.clickSortByIDUp();
    const idsDescending = await categoriesPage.getColumnValues(0);
    const sortedIdsDescending = [...idsDescending].sort((a, b) => Number(b) - Number(a));
    expect(idsDescending).toEqual(sortedIdsDescending);

    await categoriesPage.clickSortByIDDown();
    const idsAscending = await categoriesPage.getColumnValues(0);
    const sortedIdsAscending = [...idsAscending].sort((a, b) => Number(a) - Number(b));
    expect(idsAscending).toEqual(sortedIdsAscending);
  });
});
