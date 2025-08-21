FROM nginx:stable-alpine
RUN apk add --no-cache \
  nano \
  curl 

RUN rm -rf /usr/share/nginx/html/* \
  /etc/nginx/conf.d/default.conf

COPY dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]