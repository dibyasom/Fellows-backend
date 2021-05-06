# Build Container
FROM node:15.8.0-stretch

WORKDIR /build

COPY package-lock.json package.json ./

RUN npm ci

COPY ./src/ .

RUN ls

# Runtime container
FROM node:15.8.0-alpine3.10

USER node

RUN mkdir /home/node/incubate

WORKDIR /home/node/incubate

COPY --from=0 --chown=node:node /build .

CMD ["node", "server.js"]
