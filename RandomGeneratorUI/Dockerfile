FROM node:8
# Создаём рабочую директорию в образе)))
RUN mkdir -p /usr/src/node_app
# Назначаем рабочую директорию
WORKDIR /usr/src/node_app
# Копируем описание прилажухи и все её зависимости, если таковые имеются
COPY package.json /usr/src/node_app
# Устанавливает необходимые, для приложения, пакеты
RUN npm install
# Копируем всё приложение
COPY . /usr/src/node_app
# Публикуем порт приложения
EXPOSE 8383

# Вызываем скрипт запуска приложения
CMD ["npm","start"]
