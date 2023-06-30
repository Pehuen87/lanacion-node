import { getAllProducts } from '../controllers/productController';
import productRepository from '../repositories/productRepository';

// Mock de Request y Response
const reqMock = {
  query: {
    pageNumber: '1',
    itemsPerPage: '10',
    product_name: 'example_product',
    description: 'example_description'
  }
};

const resMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

// Mock del método getAllProducts en el repository
productRepository.getAllProducts = jest.fn().mockResolvedValue(['product1', 'product2']);

// Prueba
test('getAllProducts should return an array of products', async () => {
  await getAllProducts(reqMock, resMock);

  expect(resMock.status).toHaveBeenCalledWith(200);
  expect(resMock.json).toHaveBeenCalledWith(['product1', 'product2']);
  expect(productRepository.getAllProducts).toHaveBeenCalledWith(1, 10, {
    product_name: 'example_product',
    description: 'example_description'
  });
});