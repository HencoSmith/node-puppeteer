FROM node:lts-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm i -g nodemon
RUN npm i -g knex
RUN npm install --quiet
COPY . .