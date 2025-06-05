import Qs from "./Code/queries.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import fs from "fs";
import https from "https";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

await Qs.init();

// const tlsOptions = {

//     // henter key og cert
//     key: fs.readFileSync("./private-key.pem"),
//     cert: fs.readFileSync("./sertifikat.pem"),

//     // ALPN(application-layer protocol negotiation) HTTP/2: 0x68 0x32 ("h2"), HTTP/3: 0x68 0x33 ("h3")
//     ALPNProtocols: ["h3", "h2"],

//     // laveste godtatte TLS-versjon
//     minVersion: "TLSv1.2"

// }

// app.use((req, res, next) => {
//     // vurdere om jeg skal bruke hex eller base64
//     res.locals.cspNonce = crypto.randomBytes(32).toString("base64");
//     next();
// });

// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}`],
//         },
//     },
// }));

app.use(express.json());
// app.use(helmet.hsts({maxAge: 300, includeSubDomains: true, preload: true}))

app.use(express.static(path.join(__dirname, "public")));
app.set("json spaces", 2);

// app.use((request, response, next) => {
//     if(!request.secure) {
//         return response.redirect(`https://${request.headers.host}${request.url}`);
//     };
//     next();
// });

app.get("/", async (request, response) => {
    try{
        response.sendFile(path.join(__dirname, "index.html"));
    } catch (err) {
        console.error(err);
        response.status(500);
    }
});

app.get("/pris_volum", async (request, response) => {

    try{

        let {year, month} = request.query;

        year = year ? parseInt(year, 10) : null;
        month = month ? parseInt(month, 10) : null;

        const result = await Qs.Pris_volum(year, month);

        response.send(result);

    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/ansatte", async (request, response) => {

    try{

        let {year, month, firstname, lastname, id, title} = request.query;

        year = year ? parseInt(year, 10) : null;
        month = month ? parseInt(month, 10) : null;
        id = id ? parseInt(id, 10) : null;

        const result = await Qs.Ansatte(year, month, firstname, lastname, id, title);

        response.send(result);

    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/maned_salg", async (request, response) => {

    try{

        let {year, month} = request.query;

        year = year ? parseInt(year, 10) : null;
        month = month ? parseInt(month, 10) : null;

        const result = await Qs.Maned_salg(year, month);

        response.send(result);

    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/sesong_trend", async (request, response) => {

    try{

        let {year} = request.query;

        year = year ? parseInt(year, 10) : null;

        const result = await Qs.Sesong_trend(year);

        response.send(result);  

    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/leveringstid", async (request, response) => {

    
    try{

        const {company} = request.query;

        const result = await Qs.Leveringstid(company);

        response.send(result);  

    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/snitt_verdi", async (request, response) => {
    try{

        const {company} = request.query;

        const result = await Qs.Snitt_verdi(company);

        response.send(result);

    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/ettersporsel", async (request, response) => {

    try{

        let {year, product} = request.query;

        year = year ? parseInt(year, 10) : null;

        const result = await Qs.Etterspørsel(year, product);

        response.send(result);  

    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/kategorier", async (request, response) => {

    try{

        let {category} = request.query;

        const result = await Qs.Kategorier(category);

        response.send(result);

    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/lagerbeholdning", async (request, response) => {
    try{
        
        const {product} = request.query;

        const result = await Qs.Lagerbeholdning(product);

        response.send(result); 

    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/leverandor", async (request, response) => {

    try{

        let {id} = request.query;

        id = id ? parseInt(id, 10) : null;

        const result = await Qs.Leverandor(id);

        response.send(result);  

    } catch (err) {

        console.log(err)
        response.status(500)

    }
});

app.get("/salg", async (request, response) => {

    try{

        let {year, month, id, product} = request.query;

        year = year ? parseInt(year, 10) : null;
        month = month ? parseInt(month, 10) : null;
        id = id ? parseInt(id, 10) : null;

        const result = await Qs.Salg(year, month, id, product);

        response.send(result);  

    } catch (err) {

        console.log(err)
        response.status(500)

    }
});

app.get("/varer", async (request, response) => {

    try{

        let {id, product} = request.query;

        id = id ? parseInt(id, 10) : null;

        const result = await Qs.Varer(id, product);

        response.send(result);  

    } catch (err) {

        console.log(err)
        response.status(500)

    }

});



// app.post()



// app.patch()



// app.put()



// app.delete()



// ----- http-server, flere andre ting må modifiseres for å bruke

const httpServ = app.listen(port, () => {
    console.log("\n\thttp-server startet på port:", port);
});

process.on("SIGINT", () => {
    console.log("\n\tSlår av server...");
    httpServ.close(() => {
        console.log("\n\thttp-server avsluttet");
        process.exit(0);
    });
});


// ----- https-server

// const server = https.createServer(tlsOptions, app).listen(port, () => {
//     console.log("\n\thttps-server kjører på port ", port);
// });

// process.on("SIGINT", () => {
//     console.log("\n\tSlår av server...");
//     server.close(() => {
//         console.log("\n\thttps-server avsluttet");
//         process.exit(0);
//     });
// });



