FROM node:lts-alpine AS frontend

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

RUN npm i -g http-server

EXPOSE 8080

CMD ["http-server", "dist", "-p", "8082"]