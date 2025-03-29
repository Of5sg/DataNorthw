import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['info']
});

const server = express();
const port = 3000;

server.use(express.static("public"));

server.use((req, res) => {
    res.status(404);
    res.send(<h1>Error 404, Finner ikke siden</h1>);
});

server.get("/", (request, response) => {
    
    response.send("hei, vi har for øyeblikket bare customers og suppliers");
});

server.get("/customers", async (request, response) => {
    const customers = await prisma.customers.findMany();
    response.send(customers);
});

server.get("/suppliers", async (request, response) => {
    const suppliers = await prisma.suppliers.findMany({
        where: {
            company_name: {
                not: "asdgasd",
            }
        }
    });    
    response.send(suppliers);
});

server.use((req, res) => {
    res.status(404);
    res.send("404, Finner ikke siden");
});

server.listen(port, (error) => {console.error(error)});
