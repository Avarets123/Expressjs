FROM node:18-alpine3.15

WORKDIR /application/backend/

COPY package*.json ./

RUN npm install

COPY . .
