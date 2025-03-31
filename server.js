import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (request, response) => {
    
    response.send("hei, vi har for øyeblikket bare customers og suppliers");
});