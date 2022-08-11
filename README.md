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


curl -H "content-type: application/json" -d '{"name":"Vegetable"}' -X POST http://localhost:9000/api/food-types/new
curl -H "content-type: application/json" -d '{"name":"Dairy"}' -X POST http://localhost:9000/api/food-types/new
curl -H "content-type: application/json" -d '{"name":"Pastas"}' -X POST http://localhost:9000/api/food-types/new

curl -H "content-type: application/json" -d '{"name":"Parmesan"}' -X POST http://localhost:9000/api/foods/new

curl -H "content-type: application/json" -d '{"name":"Cutting"}' -X POST http://localhost:9000/api/instruction-types/new

# TODO
Understand how to combine req
Save user
CreatedBy from user
Mongo SEEDs
Populate DB
Understand how to save pictures
Understand how to check connections
Type Collections
Tags for recipes