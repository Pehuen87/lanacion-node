import { DataSource } from "typeorm"

const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "user",
    password: "password",
    database: "database",
    entities: ["dist/entity/*.js"],
    logging: true,
    synchronize: true,
})

export {myDataSource}