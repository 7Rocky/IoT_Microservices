FROM node:12.5.0-alpine

ADD *.js* /temperature-ms/

WORKDIR /temperature-ms

RUN npm install

CMD [ "npm", "start" ]
