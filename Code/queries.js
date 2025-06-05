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

Qs.Pris_volum = async function (year, month) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/pris_vs_volum/pris_vs_volum.sql", "utf-8");
    
    const values = [year, month];

    const result = await client.query(Q, values);

    client.release();

    return result.rows;

};

Qs.Maned_salg = async function (year, month) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/maned_salg/maned_salg.sql", "utf-8");
    
    const values = [year, month];

    const result = await client.query(Q, values);

    client.release();

    return result.rows;

};

Qs.Sesong_trend = async function (year) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/sesong/sesong_trend.sql", "utf-8");
    
    const values = [year];

    const result = await client.query(Q, values);

    client.release();

    return result.rows;

};

Qs.Leveringstid = async function (company) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/leveringstid/leveringstid.sql", "utf-8");
    
    const values = [company];

    const result = await client.query(Q, values);

    client.release();

    return result.rows;

};

Qs.Snitt_verdi = async function (company) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/gj_ordreverdi/gj_ordreverdi.sql", "utf-8");
    
    const values = [company];

    const result = await client.query(Q, values);

    client.release();

    return result.rows;

};

Qs.Etterspørsel = async function (year, product) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/ettersporsel/ettersporsel_trend.sql", "utf-8");
    
    const values = [year, product]

    const result = await client.query(Q, values);

    client.release();

    return result.rows;

};

Qs.Ansatte = async function (year, month, firstname, lastname, id, title) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/ansatte.sql", "utf-8");

    const values = [year, month, firstname, lastname, id, title];

    const result = await client.query(Q, values);
    
    client.release();

    return result.rows;
};

Qs.Kategorier = async function (category) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/kategorier.sql", "utf-8");

    const values = [category];

    const result = await client.query(Q, values);
    
    client.release();
    
    return result.rows;

};

Qs.Lagerbeholdning = async function (product) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/lagerbeholdning.sql", "utf-8");

    const values = [product];

    const result = await client.query(Q, values);
    
    client.release();
    
    return result.rows;

};

Qs.Leverandor = async function (id) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/leverandor.sql", "utf-8");

    const values = [id];

    const result = await client.query(Q, values);
    
    client.release();
    
    return result.rows;

};

Qs.Salg = async function (year, month, id, product) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/salg.sql", "utf-8");

    const values = [year, month, id, product];

    const result = await client.query(Q, values);
    
    client.release();
    
    return result.rows;

};

Qs.Varer = async function (id, product) {

    const client = await Qs.pool.connect();

    const Q = await fs.readFile("./SQL_queries/varer.sql", "utf-8");

    const values = [id, product];

    const result = await client.query(Q, values);
    
    client.release();
    
    return result.rows;

};

export default Qs;
