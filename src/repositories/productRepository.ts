import { Product } from "../entities/Product";
import { myDataSource } from "../datasource";
import { ILike, FindOperator } from "typeorm"

class ProductRepository {
    async getAllProducts(pageNumber: number, itemsPerPage: number, searchCriteria: Partial<Product>) {
        try {
            const query = {
                relations: ['category', 'status'],
                skip: (pageNumber - 1) * itemsPerPage,
                take: itemsPerPage,
                where: {} as Record<string, FindOperator<string>>
            };

            if (searchCriteria.product_name) {
                query.where.product_name = ILike(`%${searchCriteria.product_name}%`);
            }

            if (searchCriteria.description) {
                query.where.description = ILike(`%${searchCriteria.description}%`);
            }

            const products = await myDataSource
                .getRepository(Product)
                .find(query);

            return products;
        } catch (error) {
            throw new Error('Error retrieving products');
        }
    }


    async getProductById(productId: number) {
        try {
            const product = await myDataSource
                .getRepository(Product)
                .findOne({
                    relations: ['category', 'status'], // Include the specified relations
                    where: {
                        id: productId,
                    },
                });

            return product;
        } catch (error) {
            throw new Error('Error retrieving product by ID');
        }
    }

    async deleteProductById(productId: number) {
        try {
            const product = await this.getProductById(productId);

            if (product) {
                await myDataSource.getRepository(Product).delete(product);
                return true;
            } else {
                throw new Error('Product not found');
            }
        } catch (error) {
            throw new Error('Error deleting product by ID');
        }
    }

    async updateProduct(productId: number, prod: Product) {
        try {
            const product = await this.getProductById(productId);

            if (product) {
                await myDataSource.getRepository(Product).update(productId, prod); // Update the product with the specified ID
                return true;
            } else {
                throw new Error('Product not found');
            }
        } catch (error) {
            throw new Error('Error updating product by ID');
        }
    }

    async createProduct(prod: Product) {
        try {
            const product = await myDataSource.getRepository(Product).save(prod); // Create a product
            return product;
        } catch (error) {
            throw new Error('Error creating product');
        }
    }
}

export default new ProductRepository();