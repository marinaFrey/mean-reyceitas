# MEAN Reyceitas
# Docker Commands
docker kill $(docker ps -a -q) # this kills the containers
docker compose build  # this builds the containers
docker compose up -d  # this starts the containers

# Backend Commands
curl -H "Content-Type: application/json" -d '{"title":"Pasta", "ingredients": "pasta", "instructions":"make pasta", "createdBy": "Nicolas", "servings":1 }' -X POST http://localhost:9000/api/recipes/new
