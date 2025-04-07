import pg from "pg";
import fs from "fs/promises";

// Jeg skriver all spørringen som metoder, så de blir lettere å importere senere

const Qs = {}


Qs.init = async function () {

    const { Pool } = pg;

    // pool som property of Qs
    Qs.pool = new Pool({
        // user: "testbruker",
        // password: "testpassord",
        // host: "127.0.0.1",
        // port: 5432,
        // database: "NortW",
        connectionString: "postgres://testbruker:testpassord@127.0.0.1:5432/NorthW"
    });

}

Qs.Pris_volum = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/pris_vs_volum/pris_vs_volum.sql", "utf-8");
    
    const result = await client.query(Q);

    client.release();

    return result.rows;

};

Qs.Maned_salg = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/maned_salg/maned_salg.sql", "utf-8");
    
    const result = await client.query(Q);

    client.release();

    return result.rows;

};

Qs.Sesong_trend = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/sesong/sesong_trend.sql", "utf-8");
    
    const result = await client.query(Q);

    client.release();

    return result.rows;

};

Qs.Leveringstid = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/leveringstid/leveringstid.sql", "utf-8");
    
    const result = await client.query(Q);

    client.release();

    return result.rows;

};

Qs.Snitt_verdi = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/gj_ordreverdi/gj_ordreverdi.sql", "utf-8");
    
    const result = await client.query(Q);

    client.release();

    return result.rows;

};

Qs.Etterspørsel = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/etterspørsel/etterspørsel_trend.sql", "utf-8");
    
    const result = await client.query(Q);

    client.release();

    return result.rows;

};

Qs.Ansatte = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/ansatte.sql", "utf-8");

    const result = await client.query(Q);
    
    client.release();
    
    return result.rows;

};

Qs.Kategorier = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/kategorier.sql", "utf-8");

    const result = await client.query(Q);
    
    client.release();
    
    return result.rows;

};

Qs.Lagerbeholdning = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/lagerbeholdning.sql", "utf-8");

    const result = await client.query(Q);
    
    client.release();
    
    return result.rows;

};

Qs.Leverandor = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/leverandor.sql", "utf-8");

    const result = await client.query(Q);
    
    client.release();
    
    return result.rows;

};

Qs.Salg = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/salg.sql", "utf-8");

    const result = await client.query(Q);
    
    client.release();
    
    return result.rows;

};

Qs.Varer = async function () {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/varer.sql", "utf-8");

    const result = await client.query(Q);
    
    client.release();
    
    return result.rows;

};

export default Qs;
