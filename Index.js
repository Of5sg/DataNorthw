import pg from "pg";

const postgresIP = process.env.CONTAINER_IP;

// console.log(postgresIP);

const { Client } = pg;

const client =  new Client({
    user: "testbruker",
    password: "testpassord",
    host: "172.17.0.2",
    port: 5432,
    database: "testdb"
});

await client.connect();

const query = "SELECT * FROM customers ORDER BY company_name LIMIT 10";

await client.query(query)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });

await client.end();