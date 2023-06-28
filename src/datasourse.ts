import { DataSource } from "typeorm"
import { Product } from "./entities/Product"
import { Category } from "./entities/Category"
import { Status } from "./entities/Status"

const myDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT? parseInt(process.env.DB_PORT):3030,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Product, Category, Status],
    logging: false,
    synchronize: true,
})

export {myDataSource}