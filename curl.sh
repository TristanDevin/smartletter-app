#!/bin/bash

generate_post_data()
{
  cat <<EOF
{
    "id": "$id",
    "payload": "$payload",
    "datetime": "$datetime"
}
EOF
}

if [ "$1" == "emit" ]; then
    echo "emit data"
    id="my_id"
    payload="312F30"
    datetime="$(date +%X) $(date +%d/%m/%Y)"
    curl -X POST http://localhost:3000/data -H 'Content-Type: application/json' -d "$(generate_post_data)"
fi
if [ "$1" == "get" ]; then
    echo "get data"
    #curl -X POST http://localhost:3000/data -H 'Accept: application/json' -b "type=get"
fi
