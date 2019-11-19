FROM node:erbium

ARG NODE_ENV

COPY package*.*json ./


RUN if [ ${NODE_ENV} = "production" ] ; then npm i --quiet ; echo ${NODE_ENV} ; fi

COPY . ./

CMD ["npm", "start"]
