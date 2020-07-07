FROM node:13.8.0-slim

WORKDIR /usr/src/app

ENV NPM_CONFIG_LOGLEVEL warn

COPY package.json ./
COPY tsconfig.json ./
COPY nodemon.json ./

RUN npm install

COPY src ./src

RUN npm run build

RUN npm prune --production

RUN rm -rf ./src

CMD ["node", "./build/app.js"]