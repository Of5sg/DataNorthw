
# docker pull postgres:latest

docker run -d \
    --name post_Data \
    -e POSTGRES_USER=testbruker \
    -e POSTGRES_PASSWORD=testpassord \
    -e POSTGRES_DB=NorthW \
    -p 5432:5432 \
    -v postgres_data:/var/lib/postgresql/data \
    postgres:latest

curl -O https://raw.githubusercontent.com/pthom/northwind_psql/refs/heads/master/northwind.sql

sleep 1

cat ./northwind.sql | docker exec -i post_Data psql -U testbruker -d NorthW

# docker exec -it post_Data psql testdb -U testbruker

npm install express
npm install pg
npm install helmet

docker container start post_Data

sleep 0.3

openssl genrsa -out private-key.pem 7680

sleep 0.3

openssl req -new -key private-key.pem -out certificate-signing-req.pem

sleep 0.3

openssl x509 -req -in certificate-signing-req.pem -signkey private-key.pem -out sertifikat.pem -days 10

sleep 0.3

node https_server.js
