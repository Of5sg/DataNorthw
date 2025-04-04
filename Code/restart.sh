docker container start post_Data
sleep 0.2
cat ./SQL_queries/varer.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/varer_svar.sql
sleep 0.2
cat ./SQL_queries/salg.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/salg_svar.sql
sleep 0.2
cat ./SQL_queries/ansatte.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/ansatte_svar.sql
sleep 0.2
cat ./SQL_queries/lagerbeholdning.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/lagerbeholdning_svar.sql
sleep 0.2
cat ./SQL_queries/kategorier.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/kategorier_svar.sql
sleep 0.2
cat ./SQL_queries/leverandor.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/leverandor_svar.sql

sleep 0.2
cat ./SQL_queries/maned-salg/maned_salg.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/maned-salg/maned_salg_svar.sql
sleep 0.2
cat ./SQL_queries/gj_ordreverdi/gj_ordreverdi.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/gj_ordreverdi/gj_ordreverdi.sql
sleep 0.2
cat ./SQL_queries/leveringstid/leveringstid.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/leveringstid/leveringstid_svar.sql
sleep 0.2
cat ./SQL_queries/ettersporsel/ettersporsel_trend.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/ettersporsel/ettersporsel_trend_svar.sql
sleep 0.2
cat ./SQL_queries/sesong/sesong_trend.sql | docker exec -i post_Data psql -U testbruker -d NorthW | tee ./SQL_queries/sesong/sesong_trend_svar.sql
