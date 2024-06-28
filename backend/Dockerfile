FROM node:lts-alpine AS backend

WORKDIR /server

COPY package*.json

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "run", "node"]

