FROM nginx:stable-alpine
RUN apk add --no-cache nano curl
RUN rm -rf /usr/share/nginx/html/*
COPY dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]