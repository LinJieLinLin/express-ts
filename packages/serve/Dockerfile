FROM node:16-alpine

# add bash
RUN apk update
RUN apk upgrade
RUN apk add bash

WORKDIR /serve
# https://stackoverflow.com/a/32785014/232619
COPY ./packages/serve /serve
COPY ./wait-for-it.sh /usr/local
RUN chmod +x /usr/local/wait-for-it.sh

EXPOSE 3001

CMD bash -c "yarn && yarn dev"
