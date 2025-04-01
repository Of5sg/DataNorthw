docker container start post_Data

cat ./SQL_queries/varer.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/varer_svar.sql