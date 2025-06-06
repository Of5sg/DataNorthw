import https from "node:https";
import fs from "node:fs";
import crypto from "node:crypto";
import Qs from "./Code/queries.js";

const port = 3000;

await Qs.init();

const options = {

    //leser nøkkel og sertifikat
    key: fs.readFileSync("private-key.pem"),
    cert: fs.readFileSync("sertifikat.pem"),

    // her settes default seclevel til 4
    // det krever rsa-nøkkel på 7680-bit
    ciphers: "DEFAULT@SECLEVEL=4",

    // laveste godtatte TLS versjon 1.2
    minVersion: "TLSv1.2",

    rejectUnauthorized: false,

}

const server = https.createServer(options)


// server.on("connect", (request, socket, head) => {
//     console.log("connect-forespørsel mottatt");
//     console.log("connect request mottatt, metode:", request.method);
// });

server.on("connection", (socket) => {
//     console.log("ny tilkobling, begynner TLS handshake")
//     console.log("socket remodeAddress:", socket.remoteAddress);
//     console.log("socket remotePort:", socket.remotePort);
    console.log("socket localAddress:", socket.localAddress);
//     console.log("socket localPort:", socket.localPort);

});

server.on("tlsClientError", (exception, tlsSocket) => {
    console.log("Error before secure connection was established, on:\n\t", tlsSocket, "\n\nException:\n", exception);
});

// server.on("secureConnection", (tlsSocket) => {
//     console.log("secure connection on:", tlsSocket.remoteAddress, "\n\tTLS handshake completed")
//     console.log("tslSocket protocol:", tlsSocket.getProtocol());
// });

server.on("request", async (request, response) => {

    // request.splitUrl = request.url.split("?");

    const url = new URL(request.url, `https://${request.headers.host}`);

    if (request.socket.encrypted === true){

        // lage nonce 
        const nonce = crypto.randomBytes(32).toString("base64");

        let body;

        // routing Herifra

        if (request.method === "GET" && request.url === "/"){

            // her hentes html-siden

            try{
                body = fs.readFileSync("test.html", "utf-8");
            }catch(error){
                body = "404 - Not Found\r\n" + error;
                // sender 404 - not found, hvis det skulle være problemer med å laste filen
                response.writeHead(404, {
                    "Content-Type": "text/plain",
                    "Content-Length": Buffer.byteLength(body)
                });

                response.end(body);
                return;
            };

            response.setHeader("Content-Type", "text/html");

            body = body.replace(/{nonce}/g, nonce);
            response.setHeader("Content-Security-Policy", `script-src 'nonce-${nonce}' 'strict-dynamic';`);

            response.setHeader("Content-Length", Buffer.byteLength(body));

            response.writeHead(200);

            response.end(body);

            body = "";

        }else if (request.method === "GET" && request.url === "/index.js"){

            //hente index.js, så knappene mine fungerer

            try{
                body = fs.readFileSync("./public/index.js", "utf-8");
            }catch(error){
                body = "404 - Not Found\r\n" + error;
                // sender 404 - not found
                response.writeHead(404, {
                    "Content-Type": "text/plain",
                    "Content-Length": Buffer.byteLength(body)
                });
                response.end(body);
                return;
            };
            
            response.setHeader("Content-Type", "text/javascript");

            response.setHeader("Content-Length", Buffer.byteLength(body));

            response.writeHead(200);

            response.end(body);

            body = "";

        }else if (request.method === "GET" && request.url === "/styles.css"){

            // hente css, så det ikke ser helt forferdelig ut

            try{
                body = fs.readFileSync("./public/styles.css", "utf-8");
            }catch(error){
                body = "404 - Not Found\r\n" + error;
                // sender 404 - not found
                response.writeHead(404, {
                    "Content-Type": "text/plain",
                    "Content-Length": Buffer.byteLength(body)
                });
                response.end(body);
                return;
            };
            
            response.setHeader("Content-Type", "text/css");

            response.setHeader("Content-Length", Buffer.byteLength(body));

            response.writeHead(200);

            response.end(body);

            body = "";

        }else if (request.method === "GET" && request.url === "/teststyle.css"){

            // hente testcss, så det ikke ser helt forferdelig ut

            try{
                body = fs.readFileSync("./public/teststyle.css", "utf-8");
            }catch(error){
                // hvis filen ikke finnes
                body = "404 - Not Found\r\n" + error;
                // sender 404 - not found
                response.writeHead(404, {
                    "Content-Type": "text/plain",
                    "Content-Length": Buffer.byteLength(body)
                });
                response.end(body);
                return;
            };
            
            response.setHeader("Content-Type", "text/css");

            response.setHeader("Content-Length", Buffer.byteLength(body));

            response.writeHead(200);

            response.end(body);

            body = "";

        }else if(request.method === "GET" && url.pathname === "/ansatte"){

            // path for å hente data om ansatte

            const params = url.searchParams;

            try{

                console.log(params);

                const yearstr = params.get("year")
                const year = yearstr && yearstr !== "undefined" && yearstr !== "" ? parseInt(params.get("year"), 10) : null;
                
                const monthstr = params.get("month")
                const month = monthstr && monthstr !== "undefined" && monthstr !== "" ? parseInt(params.get("month"), 10) : null;
                
                const firstname = params.get("firstname") || "";
                
                const lastname = params.get("lastname") || "";

                const idstr = params.get("id")
                const id = idstr && idstr !== "undefined" && idstr !== "" ? parseInt(params.get("month"), 10) : null;
                
                const title = params.get("title") || "";

                console.log(year, "year")
                console.log(month, "month")
                console.log(firstname, "firstname")
                console.log(lastname, "lastname")
                console.log(id, "id")
                console.log(title, "title")

                const result = JSON.stringify(await Qs.Ansatte(year, month, firstname, lastname, id, title));

                response.setHeader("Content-Type", "application/json");
                response.writeHead(200)
                response.end(result);
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };

        }else if(request.method === "GET" && url.pathname === "/volum"){
            
            // path for å hente data om pris og volum

            const params = url.searchParams;

            try{

                const yearstr = params.get("year")
                const year = yearstr && yearstr !== "undefined" && yearstr !== "" ? parseInt(params.get("year"), 10) : null;
                
                const monthstr = params.get("month")
                const month = monthstr && monthstr !== "undefined" && monthstr !== "" ? parseInt(params.get("month"), 10) : null;
                
                const result = JSON.stringify(await Qs.Pris_volum(year, month));

                response.setHeader("Content-Type", "application/json");
                response.writeHead(200)
                response.end(result);
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };

        }else if(request.method === "GET" && url.pathname === "/maned_salg"){

            const params = url.searchParams;

            try{

                const yearstr = params.get("year")
                const year = yearstr && yearstr !== "undefined" && yearstr !== "" ? parseInt(params.get("year"), 10) : null;
                
                const monthstr = params.get("month")
                const month = monthstr && monthstr !== "undefined" && monthstr !== "" ? parseInt(params.get("month"), 10) : null;
                
                const result = JSON.stringify(await Qs.Maned_salg(year, month));
                
                response.setHeader("Content-Type", "application/jason");
                response.writeHead(200);
                response.end(result);
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };

        }else if(request.method === "GET" && url.pathname === "/sesong"){
            const params = url.searchParams;
            try{

                const yearstr = params.get("year")
                const year = yearstr && yearstr !== "undefined" && yearstr !== "" ? parseInt(params.get("year"), 10) : null;

                const result = JSON.stringify(await Qs.Sesong_trend(year));
        
                response.setHeader("Content-Type", "application/jason");
                response.writeHead(200);
                response.end(result);
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };

        }else if(request.method === "GET" && url.pathname === "/leveringstid"){
            const params = url.searchParams;
            try{

                const company = params.get("company") || "";
        
                const result = JSON.stringify(await Qs.Leveringstid(company));
        
                response.setHeader("Content-Type", "application/jason");
                response.writeHead(200);
                response.end(result);
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };

        }else if(request.method === "GET" && url.pathname === "/verdi"){
            const params = url.searchParams;
            try{
        
                const company = params.get("company") || "";
        
                const result = JSON.stringify(await Qs.Snitt_verdi(company));
        
                response.setHeader("Content-Type", "application/jason");
                response.writeHead(200);
                response.end(result);
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };

        }else if(request.method === "GET" && url.pathname === "/ettersporsel"){
            const params = url.searchParams;
            try{
        

                const yearstr = params.get("year")
                const year = yearstr && yearstr !== "undefined" && yearstr !== "" ? parseInt(params.get("year"), 10) : null;

                const product = params.get("product") || "";

                const result = JSON.stringify(await Qs.Etterspørsel(year, product));

                response.setHeader("Content-Type", "application/jason");
                response.writeHead(200);
                response.end(result);  
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };

        }else if(request.method === "GET" && url.pathname === "/kategorier"){
            const params = url.searchParams;
            try{
                
                const category = params.get("category") || "";

                const result = JSON.stringify(await Qs.Kategorier(category));
        
                response.setHeader("Content-Type", "application/jason");
                response.writeHead(200);
                response.end(result);
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };
        }else if(request.method === "GET" && url.pathname === "/lagerbeholdning"){
            const params = url.searchParams;
            try{

                const product = params.get("product") || "";
        
                const result = JSON.stringify(await Qs.Lagerbeholdning(product));
        
                response.setHeader("Content-Type", "application/jason");
                response.writeHead(200);
                response.end(result);
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };
        }else if(request.method === "GET" && url.pathname === "/leverandor"){
            const params = url.searchParams;
            try{

                const idstr = params.get("id")
                const id = idstr && idstr !== "undefined" && idstr !== "" ? parseInt(params.get("month"), 10) : null;
              
                const result = JSON.stringify(await Qs.Leverandor(id));
        
                response.setHeader("Content-Type", "application/jason");
                response.writeHead(200);
                response.end(result);

            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };

        }else if(request.method === "GET" && url.pathname === "/salg"){
            const params = url.searchParams;
            try{


                const yearstr = params.get("year")
                const year = yearstr && yearstr !== "undefined" && yearstr !== "" ? parseInt(params.get("year"), 10) : null;
                
                const monthstr = params.get("month")
                const month = monthstr && monthstr !== "undefined" && monthstr !== "" ? parseInt(params.get("month"), 10) : null;
                
                const idstr = params.get("id")
                const id = idstr && idstr !== "undefined" && idstr !== "" ? parseInt(params.get("month"), 10) : null;
                
                const product = params.get("product") || "";

                const result = JSON.stringify(await Qs.Salg(year, month, id, product));
        
                response.setHeader("Content-Type", "application/jason");
                response.writeHead(200);
                response.end(result);
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };

        }else if(request.method === "GET" && url.pathname === "/varer"){
            const params = url.searchParams;
            try{
        
                const idstr = params.get("id")
                const id = idstr && idstr !== "undefined" && idstr !== "" ? parseInt(params.get("month"), 10) : null;
              
                const product = params.get("product") || "";
        
                const result = JSON.stringify(await Qs.Varer(id, product));
        
                response.setHeader("Content-Type", "application/jason");
                response.writeHead(200);
                response.end(result);
        
            } catch (err) {
                console.log(err)
                response.writeHead(500);
                response.end("500 - Internal Server Error");
            };

        }else{

            response.setHeader("Content-Type", "text/plain");
            response.writeHead(404);
            response.end("404 - not found");

        };



    }else{
        // sender 426 - Upgrade required, hvis ikke over https.
        console.log("426 response");
        
        response.writeHead(426, {
            "Upgrade": "HTTP/3.0, HTTP/2.0",
            "Connection": "Upgrade",
        });

        response.end("426 - Upgrade Required");
    };

    request.on("close", () => {

        console.log("klienten avsluttet tilkobling");

    })

    request.on("error", err => {

        console.error("\n\n", err.cause, "\n\n", err.stack, "\n\n");

    });
    
});

// server.on("upgrade", ())

server.listen(port, () => {
    console.log("https-server listening on port:", port);
});

process.on("SIGINT", () => {
    console.log("\navslutter...")
    server.close(() => {
        console.log("server avsluttet");
        process.exit(0);
    });
});


























//https://nodejs.org/docs/latest/api/http.html#event-upgrade
//https://nodejs.org/en/learn/modules/anatomy-of-an-http-transaction#sending-response-body