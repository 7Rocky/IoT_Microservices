FROM node:12.5.0-alpine

WORKDIR /temperature-ms

COPY *.json ./
RUN npm install --production

COPY src src

CMD [ "npm", "start" ]
