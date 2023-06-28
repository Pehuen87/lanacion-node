import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const productSchema = Joi.object({
  sku: Joi.number().required(),
  category: Joi.number().required(),
  product_name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  status: Joi.number().required(),
});

const productIdSchema = Joi.object({
  id: Joi.number().required(),
});

function validateProduct(req: Request, res: Response, next: NextFunction) {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(403).json({ message: 'Datos de producto inválidos' });
  }
  next();
}

function validateProductId(req: Request, res: Response, next: NextFunction) {
  const { error } = productIdSchema.validate(req.params);
  if (error) {
    return res.status(403).json({ message: 'ID de producto inválido' });
  }
  next();
}


const validateInteger = (input: string): boolean => {

  const int = parseInt(input, 10);

  return !(isNaN(int) || int < 0 || int.toString().length !== input.length)

};



function validatePagination(req: Request, res: Response, next: NextFunction) {

  if (!validateInteger(req.query.pageNumber as string) ||
    !validateInteger(req.query.itemsPerPage as string)) {
    // Handle the error when the pageNumber or itemsPerPage are not a valid number 
    return res.status(403).json({ message: 'Invalid pageNumber or itemsPerPage' });
  }
  next();
}

export { validatePagination, validateProduct, validateProductId }