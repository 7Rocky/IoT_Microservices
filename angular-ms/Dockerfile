FROM nginx:1.17.8-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/
COPY iot-app/dist/iot-app/ /usr/share/nginx/html
