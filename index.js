import Qs from "./queries.js";
import express from "express";

const app = express();
const port = 3000;

app.get("/", async (request, response) => {
    response.send(await Qs.Pris_volum());
})

app.listen(port, () => {
    console.log("app startet på port:", port);
})