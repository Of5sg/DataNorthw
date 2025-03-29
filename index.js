import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['info']
});

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (request, response) => {
    
    response.send("hei, vi har for øyeblikket bare customers og suppliers");
});

app.get("/customers", async (request, response) => {
    const customers = await prisma.customers.findMany();
    response.send(customers);
});

app.get("/suppliers", async (request, response) => {
    const suppliers = await prisma.suppliers.findMany({
        where: {
            company_name: {
                not: "asdgasd",
            }
        }
    });    
    response.send(suppliers);
});

app.use((req, res) => {
    res.status(404);
    res.send(`<h1>Error 404, Finner ikke siden</h1>`);
});

app.listen(port, (error) => {console.error(error)});
