import pg from "pg";

const Qs = {}

Qs.init = async function () {
    const { Pool } = pg;

    const pool = new Pool({
        // user: "testbruker",
        // password: "testpassord",
        // host: "127.0.0.1",
        // port: 5432,
        // database: "NortW",
        connectionString: "postgres://testbruker:testpassord@127.0.0.1:5432/NorthW"
    });

    await pool.connect();



    Qs.Employees = pool.query("SELECT * FROM employees LIMIT 5;", (err, result) => {
        if (result === null){
            console.error(err); 
        }else{
            console.log(result);
            return (result.rows)
        };
    });

    console.log(svar)


}





Qs.init();

