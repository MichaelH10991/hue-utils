#!/bin/bash
service_name=$(jq -r .name package.json)
service_version=$(jq -r .version package.json)
service=$service_name:$service_version
echo $service

# docker run \
#   --mount type=bind,src=`pwd`,dst=/app \
#   $service env

# docker run \
#   -it \
#   --rm \
#   -v ${PWD}:/app \
#   -v /app/node_modules \
#   -p 3001:3000 \
#   -e CHOKIDAR_USEPOLLING=true \
#   sample:dev

# build container

docker run \
    -e APP_PORT=8080 \
    -v `pwd`:/app \
    -v nodemodules:/src/node_modules \
    $service npm run dev