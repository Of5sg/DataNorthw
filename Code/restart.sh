docker container start post_Data

cat ./SQL_queries/varer.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/varer_svar.sql
sleep 1
cat ./SQL_queries/salg.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/salg_svar.sql
sleep 1
cat ./SQL_queries/ansatte.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/ansatte_svar.sql
sleep 1
cat ./SQL_queries/lagerbeholdning.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/lagerbeholdning_svar.sql
sleep 1
cat ./SQL_queries/kategorier.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/kategorier_svar.sql
sleep 1
cat ./SQL_queries/leverandor.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/leverandor_svar.sql

sleep 1
cat ./SQL_queries/maned-salg/maned_salg.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/maned-salg/maned_salg_svar.sql
