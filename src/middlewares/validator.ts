import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Define the schema for validating product data
const productSchema = Joi.object({
  sku: Joi.number().required(),
  category: Joi.number().required(),
  product_name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  status: Joi.number().required(),
});

// Define the schema for validating product IDs
const productIdSchema = Joi.object({
  id: Joi.number().required(),
});

// Middleware function to validate product data
function validateProduct(req: Request, res: Response, next: NextFunction) {
  const { error } = productSchema.validate(req.body);

  if (error) {
    // Return a 403 status code with an error message when the product data is invalid
    return res.status(403).json({ message: 'Invalid product data' });
  }

  next();
}

// Middleware function to validate product IDs
function validateProductId(req: Request, res: Response, next: NextFunction) {
  const { error } = productIdSchema.validate(req.params);

  if (error) {
    // Return a 403 status code with an error message when the product ID is invalid
    return res.status(403).json({ message: 'Invalid product ID' });
  }

  next();
}

// Function to validate if a string can be parsed as a positive integer
const validateInteger = (input: string): boolean => {
  const int = parseInt(input, 10);

  return !(isNaN(int) || int < 0 || int.toString().length !== input.length);
};

// Middleware function to validate pagination parameters
function validatePagination(req: Request, res: Response, next: NextFunction) {
  if (
    !validateInteger(req.query.pageNumber as string) ||
    !validateInteger(req.query.itemsPerPage as string)
  ) {
    // Return a 403 status code with an error message when pageNumber or itemsPerPage are not valid numbers
    return res.status(403).json({ message: 'Invalid pageNumber or itemsPerPage' });
  }

  next();
}

export { validatePagination, validateProduct, validateProductId };