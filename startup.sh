
docker pull postgres:latest

docker run -d \
    --name post_Data \
    -e POSTGRES_USER=testbruker \
    -e POSTGRES_PASSWORD=testpassord \
    -e POSTGRES_DB=testdb \
    -p 5432:5432 \
    -v postgres_data:/var/lib/postgresql/data \
    postgres:latest

sleep 10

curl -O https://raw.githubusercontent.com/pthom/northwind_psql/refs/heads/master/northwind.sql

