#!/bin/bash

service_name=$(jq -r .name package.json)
service_version=$(jq -r .version package.json)

docker build --no-cache -t $service_name:$service_version .