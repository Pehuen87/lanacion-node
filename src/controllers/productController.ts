import { Request, Response } from 'express';
import { Product } from '../entities/Product';
import { myDataSource } from '../datasourse';


async function getAllProducts(req: Request, res: Response) {
    
const pageNumber = parseInt(req.query.pageNumber as string, 10); // Número de página deseado
const itemsPerPage = parseInt(req.query.itemsPerPage as string, 10); // Cantidad de elementos por página


if (isNaN(pageNumber) || pageNumber <= 0) {
  // Handle the error when the pageNumber is not a valid number or less than or equal to 0
  return res.status(400).json({ error: 'Invalid pageNumber' });
}


if (isNaN(itemsPerPage) || itemsPerPage <= 0) {
  // Handle the error when the itemsPerPage is not a valid number or less than or equal to 0
  return res.status(400).json({ error: 'Invalid itemsPerPage' });
}

  

const products = await myDataSource.getRepository(Product)
  .createQueryBuilder('product')
  .leftJoinAndSelect('product.category', 'category')
  .leftJoinAndSelect('product.status', 'status')
  .skip((pageNumber - 1) * itemsPerPage)
  .take(itemsPerPage)
  .getMany();

    res.status(200).json(products)
}

async function createProduct(req: Request, res: Response) {

    const product = await myDataSource.getRepository(Product)
                            .createQueryBuilder('product')
                            .leftJoinAndSelect('product.category', 'category')
                            .leftJoinAndSelect('product.status', 'status')
                            .getMany();

    res.status(200).json(product)
}

function getProductById(req: Request, res: Response) {
    res.status(400).json({ message: 'GET BY ID' + req.params.id });

}

function updateProduct(req: Request, res: Response) {

    //if(req.params.id)
    res.status(400).json({ message: 'uopdate BY ID' + req.params.id });


}


function deleteProductById(req: Request, res: Response) {

    res.status(400).json({ message: 'delete BY ID' + req.params.id });

}


export { getAllProducts, createProduct, getProductById, updateProduct, deleteProductById }