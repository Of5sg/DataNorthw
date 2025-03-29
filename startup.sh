
# docker pull postgres:latest

docker run -d \
    --name post_Data \
    -e POSTGRES_USER=testbruker \
    -e POSTGRES_PASSWORD=testpassord \
    -e POSTGRES_DB=testdb \
    -p 5432:5432 \
    -v postgres_data:/var/lib/postgresql/data \
    postgres:latest

sleep 10

cat ./northwind.sql | docker exec -i post_Data psql -U bruker -d testdb

# docker exec -it post_Data psql testdb -U testbruker

# curl -O https://raw.githubusercontent.com/pthom/northwind_psql/refs/heads/master/northwind.sql

docker container start post_Data

# # fikk hjelp med denne
# CONTAINER_NAME="post_Data"
# CONTAINER_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER_NAME) 
# echo CONTAINER_IP
# NODE_ENV="CONTAINER_IP=$CONTAINER_IP" node Index.js

node index.js
