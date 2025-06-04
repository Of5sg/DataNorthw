# Database
----------------------------
Dette er en Database med Northwind eksempelet.
Og en server som gir resultatene av predefinerte SQL utspørringer.

>startes ved å åpne prosjektet i ett codespace i github, og skrive det følgende i konsollen.
>```bash
>bash ./Code/startup.sh
>```
>
>hvis prosjektet har vært åpnet før, og databasen er generert, startes prosjektet på nytt ved å skrive det følgende i konsollen
>```
>docker container start post_Data
>node server.js
>```
-----

for å kune kjøre som en https-server, trengs ett sertifikat. det genreres når man kjører startup.sh, og krever litt informasjon fra brukeren.
Her er ett eksempel på hva man kan bli spurt om.

>You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
>
>- Country Name (2 letter code) [AU]:NO
>- State or Province Name (full name) [Some-State]:.
>- Locality Name (eg, city) []:Eksempelbyen
>- Organization Name (eg, company) [Internet Widgits Pty Ltd]:Testorganisasjonen
>- Organizational Unit Name (eg, section) []:.
>- Common Name (e.g. server FQDN or YOUR name) []:.
>- Email Address []:eksempel@test.com
>
>Please enter the following 'extra' attributes
to be sent with your certificate request
>- A challenge password []:testpassord
>- An optional company name []:.
-----

>man må også klikke på ports-fanen i terminalen, høyreklikke på port 3000, og endre `Change Port Protocoll` til HTTPS.