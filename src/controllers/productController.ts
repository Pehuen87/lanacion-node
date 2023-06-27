import express, { NextFunction, Request, Response } from 'express';

function getAllProducts(req: Request, res: Response, next: NextFunction) {
    res.status(400).json({ message: 'GET ALL' });

}

function createProduct(req: Request, res: Response, next: NextFunction) {

    res.status(400).json({ message: 'CREATE' });
}

function getProductById(req: Request, res: Response, next: NextFunction) {
    res.status(400).json({ message: 'GET BY ID' + req.params.id });

}

function updateProduct(req: Request, res: Response, next: NextFunction) {
    res.status(400).json({ message: 'uopdate BY ID' + req.params.id });


}

function deleteProductById(req: Request, res: Response, next: NextFunction) {

    res.status(400).json({ message: 'delete BY ID' + req.params.id });

}


export { getAllProducts, createProduct, getProductById, updateProduct, deleteProductById }