FROM node:16-alpine

# add bash
RUN apk update
RUN apk upgrade
RUN apk add bash

WORKDIR /web
# https://stackoverflow.com/a/32785014/232619
COPY ./packages/web /web

EXPOSE 3002

CMD bash -c "yarn && yarn dev"
