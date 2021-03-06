FROM node:14.16-alpine

WORKDIR /microcontrollers-ms

COPY *.json ./
RUN npm install --production

COPY src src

CMD [ "npm", "start" ]
