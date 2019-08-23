FROM zenato/puppeteer-renderer

USER root

COPY package*.json ./

RUN npm install

RUN npm install pg

RUN npm install express

WORKDIR /app

ADD . /app

EXPOSE 9070

STOPSIGNAL SIGINT

CMD npm run start







