FROM node:12.5.0-alpine

ADD *.js* /orchestrator-ms/

WORKDIR /orchestrator-ms

RUN npm install

CMD [ "npm", "start" ]
