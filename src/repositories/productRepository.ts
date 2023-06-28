import { Product } from "../entities/Product";
import { myDataSource } from "../datasourse";


class ProductRepository {

    async getAllProducts(pageNumber: number, itemsPerPage: number) {
        try {
            const products = await myDataSource.getRepository(Product)
                .find({
                    relations: ['category', 'status'], // Include the specified relations
                    skip: (pageNumber - 1) * itemsPerPage,
                    take: itemsPerPage,
                });
            return products;

        } catch (error) {
            throw new Error('Error retrieving Products');
        }
    }


    async getProductById(productId: number) {
        try {
            const product = await myDataSource.getRepository(Product)
                .findOne({
                    relations: ['category', 'status'], // Include the specified relations
                    where: {
                        id: productId
                    },
                });
            return product;

        } catch (error) {
            throw new Error('Error retrieving Product by Id');
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
            throw new Error('Error deleting Product by ID');
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
            throw new Error('Error updating Product by ID');
        }
    }

}

export default new ProductRepository();