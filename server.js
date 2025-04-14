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
    try{
        response.sendFile(path.join(__dirname, "./index.html"));
    } catch (err) {
        console.error(err);
        response.status(500);
    }
});

app.get("/pris_volum", async (request, response) => {
    try{
      response.send(await Qs.Pris_volum());  
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/ansatte", async (request, response) => {
    const result = await Qs.Ansatte();
    // const name = "Margaret Peacock";
    // const res = result.filter(function (emp) {
    //     return emp.name == name;
    // });
    try{
        response.send(result);
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/maned_salg", async (request, response) => {
    const result = await Qs.Maned_salg()
    try{
        response.send(result);  
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/sesong_trend", async (request, response) => {
    const result = await Qs.Sesong_trend()
    try{
        response.send(result);  
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/leveringstid", async (request, response) => {
    const result = await Qs.Leveringstid()
    try{
        response.send(result);  
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/snitt_verdi", async (request, response) => {
    const result = await Qs.Snitt_verdi()
    try{
        response.send(result);  
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/ettersporsel", async (request, response) => {
    const result = await Qs.Etterspørsel()
    try{
        response.send(result);  
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/kategorier", async (request, response) => {
    const result = await Qs.Kategorier()
    try{
        response.send(result);  
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/lagerbeholdning", async (request, response) => {
    const result = await Qs.Lagerbeholdning()
    try{
        response.send(result);  
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/leverandor", async (request, response) => {
    const result = await Qs.Leverandor()
    try{
        response.send(result);  
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/salg", async (request, response) => {
    const result = await Qs.Salg()
    try{
        response.send(result);  
    } catch (err) {
        console.log(err)
        response.status(500)
    }
});

app.get("/varer", async (request, response) => {
    const result = await Qs.Varer()
    try{
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





app.listen(port, () => {
    console.log("app startet på port:", port);
});