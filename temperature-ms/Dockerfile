FROM node:12.16.1-alpine

WORKDIR /temperature-ms

COPY *.json ./
RUN npm install --production

COPY src src

CMD [ "npm", "start" ]
