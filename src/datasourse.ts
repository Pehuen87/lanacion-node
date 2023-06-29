import { DataSource } from "typeorm"
import { Category } from "./entities/Category"
import { Product } from "./entities/Product"
import { Status } from "./entities/Status"


const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "3286",
    database: "lanaciondatabase",
    entities: [Product, Category, Status],
    logging: false,
    synchronize: true,
})

export { myDataSource }