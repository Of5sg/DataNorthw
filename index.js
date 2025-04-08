import Qs from "./Code/queries.js";
import express from "express";
import * as orm from "Documentation/orm.js";

import fs from "fs/promises";
import { Customer } from "./Documentation/orm.js";

const app = express();
const port = 3000;

await Qs.init();

//------------------GET-------------------------

app.get("/", async (request, response) => {
    response.send("vi har de følgende sidene tilgjengelig: pris_volum, ansatte, maned_salg, sesong_trend, leveringstid, snitt_verdi, ettersporsel, kategorier, lagerbeholdning, leverandor, salg, varer")
});

app.get("/pris_volum", async (request, response) => {
    response.send(await Qs.Pris_volum());
});

app.get("/ansatte", async (request, response) => {
    response.send(await Qs.Ansatte());
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
    response.send(await Qs.Salg());
});

app.get("/varer", async (request, response) => {
    response.send(await Qs.Varer());
});

//--------------------POST-----------------------

app.post()

//--------------------PATCH-----------------------

app.patch()

//--------------------PUT-----------------------

app.put()

//--------------------DELETE-----------------------

app.delete()





app.listen(port, () => {
    console.log("app startet på port:", port);
});