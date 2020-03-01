FROM node:12.5.0-alpine

ADD *.json /temperature-ms/
ADD src /temperature-ms/src

WORKDIR /temperature-ms

RUN npm install --production

CMD [ "npm", "start" ]
