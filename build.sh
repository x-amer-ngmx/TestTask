#/din/sh

echo "Собираем контейнеры и сливаем образ node:8"

docker stop $(docker ps -a --format "{{.Names}}") || true \
&& docker rm $(docker ps -a --format "{{.Names}}") || true \
&& docker rmi $(docker images "random*" -q)

docker build -t random-api ./RandomAPI || true \
&& docker build -t random-sock ./WebSocketSrv || true \
&& docker build -t random-web ./RandomGeneratorUI



