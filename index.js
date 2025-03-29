import express from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient({
    log: ['info']
});

async function main(){
    const shippers = await prisma.shippers.findMany({
        where: {
            shipper_id: {
                not: 1234,
            }
        }
    });
    console.log(shippers);
}

main();