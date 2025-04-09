import Qs from "./Code/queries.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

await Qs.init();

app.get("/", async (request, response) => {
    response.sendFile(path.join(__dirname, "./index.html"), err => {
        console.error(err);
    });
});

app.get("/pris_volum", async (request, response) => {
    response.send(await Qs.Pris_volum());
});

app.get("/ansatte", async (request, response) => {
    const result = await Qs.Ansatte();
    // const name = "Margaret Peacock";
    // const res = result.filter(function (emp) {
    //     return emp.name == name;
    // });   
    response.send(result);
});

app.get("/maned_salg", async (request, response) => {
    response.send(await Qs.Maned_salg());
});

app.get("/sesong_trend", async (request, response) => {
    response.send(await Qs.Sesong_trend());
});

app.get("/leveringstid", async (request, response) => {
    response.send(await Qs.Leveringstid());
});

app.get("/snitt_verdi", async (request, response) => {
    response.send(await Qs.Snitt_verdi());
});

app.get("/ettersporsel", async (request, response) => {
    response.send(await Qs.Etterspørsel());
});

app.get("/kategorier", async (request, response) => {
    response.send(await Qs.Kategorier());
});

app.get("/lagerbeholdning", async (request, response) => {
    response.send(await Qs.Lagerbeholdning());
});

app.get("/leverandor", async (request, response) => {
    response.send(await Qs.Leverandor());
});

app.get("/salg", async (request, response) => {
    const result = await Qs.Salg();
    response.send(result);
});

app.get("/varer", async (request, response) => {
    response.send(await Qs.Varer());
});



// app.post()



// app.patch()



// app.put()



// app.delete()





app.listen(port, () => {
    console.log("app startet på port:", port);
});