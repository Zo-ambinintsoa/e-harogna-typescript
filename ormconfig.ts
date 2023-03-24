import { env } from "./env";
import { entities } from "./src/entity/entities";

export = {
    type: env.database.schema,
    host: env.database.host,
    port: env.database.port,
    username: env.database.username,
    password: env.database.password,
    database: env.database.name,
    synchronize: true,
    entities:
        entities
    ,
    logging: "all",
}