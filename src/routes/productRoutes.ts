import express from 'express';
import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProductById
} from '../controllers/productController';
import { validateProduct, validateProductId } from '../middlewares/validator';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', validateProduct, createProduct);
router.get('/:id', validateProductId, getProductById);
router.put('/:id', validateProductId, validateProduct, updateProduct);
router.delete('/:id', validateProductId, deleteProductById);

export default router;