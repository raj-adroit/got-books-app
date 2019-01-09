FROM node:8.9 as builder

RUN mkdir -p /app && npm i -g gulp node-gyp @angular/cli

WORKDIR /app

ADD package.json /app/

RUN npm install

COPY . /app/

RUN npm run-script build

FROM nginx:1.11.12-alpine

RUN rm /etc/nginx/conf.d/default.conf
ADD nginx/conf.d/ /etc/nginx/conf.d/

COPY --from=builder /app/dist/bookdetails/ /home/app

EXPOSE 80
