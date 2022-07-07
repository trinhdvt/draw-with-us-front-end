FROM nginx:alpine

COPY build /usr/share/nginx/build

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT [ "nginx","-g","daemon off;" ]