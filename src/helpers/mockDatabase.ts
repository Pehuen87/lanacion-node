
import { myDataSource } from "../datasourse";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { Status } from "../entities/Status";


const categories : Category[] = [];
const status: Status[] = [];


function createCategory(){
  const newCategory = new Category();
  newCategory.category_name = 'Category1';
  newCategory.description = 'Esta es una categoria';

  myDataSource.getRepository(Category).save(newCategory)
    .then((savedCategory) => {
      console.log('Category created:', savedCategory);
      categories.push(savedCategory);
      console.log('categories ', categories);
    })
    .catch((error) => {
      console.error('Error creating Category:', error);
    })
}

function createCategories(value: number){
  for(let i = 0; i<value; i++){
    createCategory();
  }
}


function createStatus(stat:boolean){
  const newStatus = new Status();
  newStatus.status = stat;
  newStatus.description = 'Esta es una categoria';

  myDataSource.getRepository(Status).save(newStatus)
    .then((savedStatus) => {
      console.log('Status created:', savedStatus);
      status.push(savedStatus);
    })
    .catch((error) => {
      console.error('Error creating Status:', error);
    })
}


function createProduct(){
  
  const newProduct = new Product();
  newProduct.sku = 12345;
  newProduct.product_name = 'Sample Product';
  newProduct.description = 'A sample product description';
  newProduct.price = 9.99;
  newProduct.category = categories[0];
  newProduct.status = status[0];

  myDataSource.getRepository(Product).save(newProduct)
  .then((savedProduct) => {
    console.log('Product created:', savedProduct);
  })
  .catch((error) => {
    console.error('Error creating product:', error);
  })
}





async function createMockData(){
  createCategories(2)
  createStatus(true)
  createStatus(false);
  setTimeout(createProduct, 5000);
}

export {createMockData}
