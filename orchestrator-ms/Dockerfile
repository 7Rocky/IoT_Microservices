FROM node:12.18-alpine

WORKDIR /orchestrator-ms

COPY *.json ./
RUN npm install --production

COPY src src

CMD [ "npm", "start" ]
