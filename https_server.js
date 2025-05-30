import https from "node:https";
import { readFileSync } from "node:fs";

const port = 3000;

const options = {

    //leser nøkkel og sertifikat
    key: readFileSync("private-key.pem"),
    cert: readFileSync("certificate.pem"),

    //setter default seclevel til 4, 192 bit security level.
    ciphers: "DEFAULT@SECLEVEL=4",

    // laveste godtatte TLS versjon 1.2
    minVersion: "TLSv1.2",

}






const server = https.createServer(options)


server.on("connection", () => {
    console.log("ny tilkobling, begynner TLS handshake")
});

server.on("tlsClientError", (exception, tlsSocket) => {
    console.log("Error before secure connection was established, on:\n\t", tlsSocket, "\n\nException:\n", exception);
})

server.on("secureConnection", (tlsSocket) => {
    console.log("secure connection on", tlsSocket, "\n\tTLS handshake completed")
});


server.on("request", (request, response) => {
    if (request.protocol == "https"){

        let body;
        try{
            body = readFileSync("index.html");
        }catch(error){
            console.log(error);

            //trenger if-statement som forteller brukeren at ingen data er funnet
        };

        // response.setHeader()
        // response.getHeader()
        response.setHeader("Content-Type", "text/html");
        response.setHeader("Content-Length", Buffer.byteLength(body))

        response.writeHead(200, {
            "Content-Length": Buffer.byteLength(body),
            "Content-Type": "text/html",
        });
        response.end(body);
    }else{

    };

    request.on("error", err => {
        console.error(err.cause, "\n\n", err.stack, "\n")
    });
    
})

// server.on("upgrade", ())

server.listen(port, () => {
    console.log("https-server listening on port:", port);
});


















//https://nodejs.org/docs/latest/api/http.html#event-upgrade
//https://nodejs.org/en/learn/modules/anatomy-of-an-http-transaction#sending-response-body