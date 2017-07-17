#/din/sh

echo "Выполняем комманду run для всех контейнеров."

docker stop $(docker ps -a --format "{{.Names}}") || true \
&& docker rm $(docker ps -a --format "{{.Names}}") || true

docker run -dit -p 7344:7344 --name api random-api || true \
&& docker run -dit -p 3333:3333 --link api:api --name socket random-sock || true \
&& docker run -dit -p 8383:8383 --name web random-web || true

docker ps
