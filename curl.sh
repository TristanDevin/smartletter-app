#!/bin/bash

generate_post_data()
{
  cat <<EOF
{
    "login": "$login",
    "password": "$password",
    "timestamp": "$timestamp"
}
EOF
}

if [ "$1" == "emit" ]; then
    echo "emit data"
    login="my_login"
    password="my_password"
    timestamp="$(date +%R) $(date +%d/%m/%Y)"
    curl -X POST http://localhost:3000/data -H 'Content-Type: application/json' -d "$(generate_post_data)"
else
    echo "get data"
    #curl -X POST http://localhost:3000/data -H 'Accept: application/json' -b "type=get"
fi
