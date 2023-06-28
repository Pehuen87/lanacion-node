import { myDataSource } from "../datasourse";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { Status } from "../entities/Status";
import { faker } from '@faker-js/faker'

const categories: Category[] = [];
const status: Status[] = [];

function createCategory() {
  const newCategory = new Category();
  newCategory.category_name = faker.commerce.department();
  newCategory.description = faker.commerce.productMaterial();

  return myDataSource.getRepository(Category)
    .save(newCategory)
    .then((savedCategory) => {
      console.log('Category created:', savedCategory);
      categories.push(savedCategory);
    })
    .catch((error) => {
      console.error('Error creating Category:', error);
    });
}

function createCategories(value: number) {
  const promises = [];
  for (let i = 0; i < value; i++) {
    promises.push(createCategory());
  }
  return Promise.all(promises);
}

function createStatus(stat: boolean) {
  const newStatus = new Status();
  newStatus.status = stat;
  newStatus.description = faker.word.adjective();

  return myDataSource.getRepository(Status)
    .save(newStatus)
    .then((savedStatus) => {
      console.log('Status created:', savedStatus);
      status.push(savedStatus);
    })
    .catch((error) => {
      console.error('Error creating Status:', error);
    });
}

function createProduct() {
  const newProduct = new Product();
  newProduct.sku = faker.number.int({ min: 1, max: 45651234 });
  newProduct.product_name = faker.commerce.productName();
  newProduct.description = faker.commerce.productDescription();
  newProduct.price = faker.number.float();
  newProduct.category = categories[faker.number.int({ min: 0, max: categories.length - 1 })];
  newProduct.status = status[faker.number.int({ min: 0, max: status.length - 1 })];

  return myDataSource.getRepository(Product)
    .save(newProduct)
    .then((savedProduct) => {
      console.log('Product created:', savedProduct);
    })
    .catch((error) => {
      console.error('Error creating product:', error);
    });
}

function createProducts(value: number) {
  const promises = [];
  for (let i = 0; i < value; i++) {
    promises.push(createProduct());
  }
  return Promise.all(promises);
}

async function createMockData() {
  await createCategories(2);
  await createStatus(true);
  await createStatus(false);
  await createProducts(100);
}

export { createMockData };