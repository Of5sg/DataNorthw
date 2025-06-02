import https from "node:https";
import { readFileSync } from "node:fs";
import crypto from "node:crypto";

const port = 3000;

const options = {

    //leser nøkkel og sertifikat
    key: readFileSync("private-key.pem"),
    cert: readFileSync("sertifikat.pem"),

    // her settes default seclevel til 4
    // det krever rsa-nøkkel på 7680-bit
    ciphers: "DEFAULT@SECLEVEL=4",

    // laveste godtatte TLS versjon 1.2
    minVersion: "TLSv1.2",

    rejectUnauthorized: false,

}

// må implementere QUERY http metoden, selv ser det ut som??
// det kan være innbygget
// https://httpwg.org/http-extensions/draft-ietf-httpbis-safe-method-w-body.html

// SEARCH metoden?

const server = https.createServer(options)

server.on("connection", () => {
    console.log("ny tilkobling, begynner TLS handshake")
});

// server.on("tlsClientError", (exception, tlsSocket) => {
//     console.log("Error before secure connection was established, on:\n\t", tlsSocket, "\n\nException:\n", exception);
// });

// server.on("secureConnection", (tlsSocket) => {
//     console.log("secure connection on", tlsSocket, "\n\tTLS handshake completed")
// });

server.on("request", (request, response) => {

    // console.log("\n\n\nHer kommer request \n\n",request);

    const {headers, method, url} = request;

    let reqBody = [];

    if(method == "POST" || method == "PUT"){

        request.on("error", err => {
                console.error(err);
            })
            .on("data", chunk => {
                reqBody.push(chunk);
            })
            .on("end", () => {
                reqBody = Buffer.concat(reqBody).toString();
            });
    };

    if (request.socket.encrypted === true){

        // lage nonce 
        const nonce = crypto.randomBytes(32).toString("base64");
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/nonce

        let body;

        try{
            body = readFileSync("index.html");
        }catch(error){
            console.error(error);

            // sender 404 - not found, hvis det skulle være problemer med å laste filen
            response.writeHead(404, {
                "Content-Type": "text/plain",
                "Content-Length": Buffer.byteLength("404 - Not Found")
            });
            response.end("404 - Not Found");
            return;
        };

        // response.setHeader()
        // response.getHeader()
        response.setHeader("Content-Type", "text/html");
        response.setHeader("Content-Length", Buffer.byteLength(body));
        response.setHeader("Content-Security-Policy", `script-src "nonce-${nonce}" "strict-dynamic";`);

        response.writeHead(200);

        response.end(body);
    }else{
        console.log("426 response");
        // sender 426 - Upgrade required, hvis ikke på https.
        response.writeHead(426, {
            "Upgrade": "HTTP/3.0, HTTP/2.0",
            "Connection": "Upgrade",
            "Content-Length": Buffer.byteLength("426 - Upgrade Required")
        });
        response.end("426 - Upgrade Required");
    };

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