FROM node:lts-buster
WORKDIR /usr/app
COPY package.json .

RUN apt-get update
RUN apt-get install vim -y
RUN apt-get install libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev -y
RUN apt-get install libasound2 -y

RUN npm i -g nodemon
RUN npm i -g knex
RUN npm install --quiet
COPY . .