FROM node:20

ARG GITHUB_TOKEN

ENV MONGO_URI="mongodb://localhost:27017/PDC-DB"

WORKDIR /app

COPY . .

RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > .npmrc
RUN echo "@panda-chess:registry=https://npm.pkg.github.com" >> .npmrc

RUN yarn install

RUN yarn build

RUN npm i -g nodemon

EXPOSE 80

CMD [ "yarn", "prod" ]