FROM node:20

WORKDIR /app

COPY . .

WORKDIR /app

RUN yarn install

RUN yarn build

RUN npm i -g nodemon

EXPOSE 80

CMD [ "yarn", "dev" ]