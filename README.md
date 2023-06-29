# LaNacion Backend App

This is the backend of an application that allows managing a list of products. It provides endpoints for creating, retrieving, updating, and deleting products from a relational database. The API supports filtering products by name and description and also provides pagination for the result set.

## Requirements

- Node.js (v12.0.0 or higher)
- npm package manager

## Installation

Follow these steps to install and run the application:

1. Clone the repository:

```
git clone https://github.com/Pehuen87/lanacion
```

2. Navigate to the project directory:

```
cd lanacion
```

3. Install the dependencies:

```
npm install
```

4. Configure the environment variables:

Create a `.env` file in the root directory of the project and provide the following configuration values:

```
SERVER_PORT=<SERVER_PORT_NUMBER>
DB_HOST=<DATABASE_HOST>
DB_PORT=<DATABASE_PORT>
DB_USER=<DATABASE_USER>
DB_PASSWORD=<DATABASE_PASSWORD>
DB_NAME=<DATABASE_NAME>
```

Make sure to replace `<SERVER_PORT_NUMBER>`, `<DATABASE_HOST>`, `<DATABASE_PORT>`, `<DATABASE_USER>`, `<DATABASE_PASSWORD>`, and `<DATABASE_NAME>` with the appropriate values.

5. Start the server:

```
npm start
```

The server will run on the port specified in the `.env` file.

6. Access the API:

You can access the API using the following base routes:

- Get all products: `GET /products?pageNumber=<PAGE_NUMBER>&itemsPerPage=<ITEMS_PER_PAGE>&product_name=<PRODUCT_NAME>&description=<DESCRIPTION>`
  - Optional query parameters:
    - `pageNumber`: Desired page number for pagination
    - `itemsPerPage`: Number of items per page
    - `product_name`: Filter products by name (case-insensitive)
    - `description`: Filter products by description (case-insensitive)
- Create a product: `POST /products`
- Get a product by ID: `GET /products/:id`
- Update a product: `PUT /products/:id`
- Delete a product: `DELETE /products/:id`

Make sure to replace `:id` with the actual ID of the product when making update or delete requests.

7. Create mock data (optional):

If you want to create mock data in the database, you can select the "Create Mock Data" option from the prompt when running the application.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more information.

## Author

This project was created by Pehuén Assalone. You can find the repository on [GitHub](https://github.com/Pehuen87/lanacion).