FROM node:13.14-slim

WORKDIR /usr/src/app

ENV NPM_CONFIG_LOGLEVEL warn

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

RUN npm install typescript -g

COPY package.json .
COPY tsconfig.json .

RUN npm i --no-audit

COPY src ./src

RUN npm run build

RUN npm prune --production

RUN rm -rf ./src
RUN rm -rf ./package.json
RUN rm -rf ./package-lock.json
RUN rm -rf ./tsconfig.json

CMD ["node", "./dist/app.js"]
