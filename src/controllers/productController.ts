import { Request, Response } from 'express';
import { boolean } from 'joi';
import { Product } from '../entities/Product';
import productRepository from '../repositories/productRepository';

// Handler function to get all products
async function getAllProducts(req: Request, res: Response) {
  const pageNumber = parseInt(req.query.pageNumber as string, 10); // Desired page number
  const itemsPerPage = parseInt(req.query.itemsPerPage as string, 10); // Number of items per page

  const searchCriteria: Partial<Product> = {
    product_name: req.query.product_name as string,
    description: req.query.description as string
  };

  try {
    const products = await productRepository.getAllProducts(pageNumber, itemsPerPage, searchCriteria);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
}

// Handler function to create a product
async function createProduct(req: Request, res: Response) {
  try {
    const product = await productRepository.createProduct(req.body); // Create a new product using the request body
    if (!product) return res.status(400).json({ message: 'Failed to create product' });
    return res.status(201).json(product); // Send the created product as a JSON response with a 201 status code
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
}

// Handler function to get a product by its ID
async function getProductById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    const product = await productRepository.getProductById(id); // Retrieve the product from the repository based on the ID
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product); // Send the retrieved product as a JSON response with a 200 status code
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
}

// Handler function to update a product
async function updateProduct(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    const product = await productRepository.updateProduct(id, req.body); // Update the product in the repository based on the ID and request body
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product); // Send the updated product as a JSON response with a 200 status code
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
}

// Handler function to delete a product by its ID
async function deleteProductById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    const deleted = await productRepository.deleteProductById(id); // Delete the product from the repository based on the ID
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json({ message: "Product deleted successfully" }); // Send a 200 status code with a success message indicating that the product was deleted
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
}

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProductById
};