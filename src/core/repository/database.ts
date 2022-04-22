import { knex } from "knex";
import process from "process";

const db = knex({
  client: "mssql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
  },
});

export default db;
