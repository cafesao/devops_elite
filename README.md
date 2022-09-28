# devops_elite

Treino de devops Elite

## Rodar o projeto + DB + Migrations

`docker-compose -f ./Docker/docker-compose.yml --env-file .env up --build --remove-orphans`   

## Rodar apenas o DB

`docker-compose -f ./Docker/docker-compose-db.yml --env-file .env up --build --remove-orphans`   
