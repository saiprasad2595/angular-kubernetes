FROM nginx:alpine
COPY ./dist/hello-world ./usr/share/nginx/html
