FROM node:10-alpine
MAINTAINER Jim DeLois <jimdelois@users.noreply.github.com>

COPY ./ /app/
WORKDIR /app

RUN mkdir /build
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install -g \
        pkg \
    && npm install --only=production \
    && apk del .gyp

CMD npm run build
