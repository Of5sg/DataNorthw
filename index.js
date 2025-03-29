import pg from "pg";
import express from "express";
import { PrismaClient } from "@prisma/client";








// const postgresIP = process.env.CONTAINER_IP;

// const app = express();
// const port = 3000;

// // bruke pool istedet

// const { Pool } = pg;

// const pool = new Pool({
//     user: "testbruker",
//     password: "testpassord",
//     host: "172.17.0.2",
//     port: 5432,
//     database: "testdb"
// });

// const client = await pool.connect()

// const query = "SELECT * FROM customers ORDER BY company_name LIMIT 10";

// const result = await client.query(query)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// await client.end();


// // bruke client

// const { Client } = pg;

// const client =  new Client({
//     user: "testbruker",
//     password: "testpassord",
//     host: "172.17.0.2",
//     port: 5432,
//     database: "testdb"
// });

// await client.connect();

// const query = "SELECT * FROM customers ORDER BY company_name LIMIT 10";

// await client.query(query)
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// await client.end();