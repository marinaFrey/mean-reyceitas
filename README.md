# MEAN Reyceitas
# Docker Commands
docker kill $(docker ps -a -q) # this kills the containers
docker compose build  # this builds the containers
docker compose up -d  # this starts the containers

# Backend Commands
curl -H "content-type: application/json" -d '{"title":"pasta", "createdBy": "nicolas", "servings":1 }' -X POST http://localhost:9000/api/recipes/new

curl -H "content-type: application/json" -d '{"name":"UNIT"}' -X POST http://localhost:9000/api/unit-types/new
curl -H "content-type: application/json" -d '{"name":"VOLUME"}' -X POST http://localhost:9000/api/unit-types/new
curl -H "content-type: application/json" -d '{"name":"WEIGHT"}' -X POST http://localhost:9000/api/unit-types/new

curl -H "content-type: application/json" -d '{"name":"gram", "abbreviation": "g", "unitType": "62f29e70bf56de01da9d0515" }' -X POST http://localhost:9000/api/units/new


curl -H "content-type: application/json" -d '{"name":"Vegetable"}' -X POST http://localhost:9000/api/food-types/new
curl -H "content-type: application/json" -d '{"name":"Dairy"}' -X POST http://localhost:9000/api/food-types/new

curl -H "content-type: application/json" -d '{"name":"Parmesan"}' -X POST http://localhost:9000/api/foods/new

curl -H "content-type: application/json" -d '{"name":"Cutting"}' -X POST http://localhost:9000/api/instruction-types/new

