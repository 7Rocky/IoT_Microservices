FROM nginx:latest

COPY iot-app/dist/iot-app/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/
