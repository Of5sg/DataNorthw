docker container start post_Data

cat ./SQL_queries/varer.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/varer_svar.sql
cat ./SQL_queries/salg.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/salg_svar.sql
cat ./SQL_queries/ansatte.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/ansatte_svar.sql
cat ./SQL_queries/lagerbeholdning.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/lagerbeholdning_svar.sql
cat ./SQL_queries/kategorier.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/kategorier_svar.sql
