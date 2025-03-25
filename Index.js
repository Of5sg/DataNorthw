import pg from "pg";

const { Client } = pg;

const client =  new Client({
    user: "testbruker",
    password: "testpassord",
    host: "172.17.0.2",
    port: 5432,
    database: "testdb"
});

await client.connect();

const query = "SELECT * FROM customers "

await client.query("SELECT * FROM customers LIMIT 10;")
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })

await client.end();