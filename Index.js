import pg from "pg";

const { Client } = pg;

const client =  new Client({
    user: "testbruker",
    password: "testpassord",
    host: "localhost",
    port: 5432,
    database: "testdb"
});

await client.connect();

const resultat = client.query('SELECT * FROM orders;');

console.log(resultat);

await client.end();