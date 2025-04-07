import pg from "pg";
import fs from "fs/promises";

// Jeg skriver all spørringen som metoder, så de blir lettere å importere senere

const Qs = {}

const { Pool } = pg;

const pool = new Pool({
    // user: "testbruker",
    // password: "testpassord",
    // host: "127.0.0.1",
    // port: 5432,
    // database: "NortW",
    connectionString: "postgres://testbruker:testpassord@127.0.0.1:5432/NorthW"
});

const client = await pool.connect();

Qs.Pris_volum = async function () {
    client.query(`
        SELECT 
            EXTRACT(YEAR FROM order_date) AS year,
            ROUND(AVG(((unit_price*quantity)*(1 - discount))/quantity)::numeric, 2) AS snitt_pris_per,
            ROUND(AVG(discount)::numeric, 2) AS discount,
            CASE
                WHEN quantity < 20 THEN 'lavt volum' 
                WHEN quantity > 50 THEN 'høyt volum'
            ELSE
                'middels volum'
            END AS volum
        FROM order_details
        JOIN orders ON orders.order_id = order_details.order_id
        GROUP BY year, volum
        ORDER BY year`, 

        (err, result) => {
            if (result === null){
                console.error(err)
            }else{
                console.log(result.rows);
                return(result.rows);
            };
        }
    );
    client.release();
};

Qs.Employees = async function () {
    client.query("SELECT * FROM employees LIMIT 5;", (err, result) => {
        if (result === null){
            console.error(err); 
        }else{
            console.log(result);
            return (result.rows);
        };
    });
    client.release();
};

Qs.Pris_volum()

export default Qs;
