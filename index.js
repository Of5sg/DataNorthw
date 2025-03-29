import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['info']
});

const server = express();
const port = 3000;

server.get("/", (request, response) => {
    response.send("hello world");
});

server.get("/customers", async (request, response) => {
    response = await prisma.customers.findMany({
        where: {
            shipper_id: {
                not: 1234,
            }
        }
    });    
    response.send(shippers);
});

server.listen((error) => {console.error(error)});
