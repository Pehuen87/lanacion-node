import { Request, Response } from 'express';
import { Product } from '../entities/Product';
import { myDataSource } from '../datasourse';
import productRepository from '../repositories/productRepository';


async function getAllProducts(req: Request, res: Response) {

  const pageNumber = parseInt(req.query.pageNumber as string, 10); // Número de página deseado
  const itemsPerPage = parseInt(req.query.itemsPerPage as string, 10); // Cantidad de elementos por página

  try {
    const products = await productRepository.getAllProducts(pageNumber, itemsPerPage);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "An error ocurred" });
  }

}

async function createProduct(req: Request, res: Response) {
  try {
    const product = await productRepository.createProduct(req.body);
    if (!product) return res.status(402).json({ message: 'No product created' })
    return res.status(202).json(product);
  } catch (error) {
    return res.status(500).json({ message: "An error ocurred" });
  }
}

async function getProductById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    const product = await productRepository.getProductById(id);
    if (!product) return res.status(404).json({ message: 'No product with id ' + id })
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "An error ocurred" });
  }
}

async function updateProduct(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    const product = await productRepository.updateProduct(id, req.body);
    if (!product) return res.status(404).json({ message: 'No product with id ' + id })
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "An error ocurred" });
  }
}


async function deleteProductById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string, 10);
    const deleted = await productRepository.deleteProductById(id);
    if (!deleted) return res.status(404).json({ message: 'No product with id ' + id })
    return res.status(204).json({ message: "Deleted product with id: " + id });
  } catch (error) {
    return res.status(500).json({ message: "An error ocurred" });
  }

}


export { getAllProducts, createProduct, getProductById, updateProduct, deleteProductById }