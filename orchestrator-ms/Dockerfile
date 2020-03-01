FROM node:12.5.0-alpine

ADD *.json /orchestrator-ms/
ADD src /orchestrator-ms/src

WORKDIR /orchestrator-ms

RUN npm install --production

CMD [ "npm", "start" ]
