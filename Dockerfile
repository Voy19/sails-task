FROM node:12

ARG NODE_ENV

COPY package*.*json ./


RUN if [ ${NODE_ENV} = "production" ] ; then npm i --quiet ; fi
RUN npm i pm2@latest -g --quiet

COPY . ./
