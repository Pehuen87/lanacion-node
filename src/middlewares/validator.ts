import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const productSchema = Joi.object({
  sku: Joi.number().required(),
  id_categoria: Joi.number().required(),
  nombre_producto: Joi.string().required(),
  descripcion: Joi.string().required(),
  precio: Joi.number().required(),
  id_estado: Joi.number().required(),
});

const productIdSchema = Joi.object({
  id: Joi.number().required(),
});

export function validateProduct(req: Request, res: Response, next: NextFunction) {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Datos de producto inválidos' });
  }
  next();
}

export function validateProductId(req: Request, res: Response, next: NextFunction) {
  const { error } = productIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: 'ID de producto inválido' });
  }
  next();
}