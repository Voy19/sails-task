FROM node:8

WORKDIR /usr/app

COPY package*.*json ./

RUN npm i --quiet
# RUN npm install --only=production

COPY . ./

EXPOSE 8080

CMD ["npm", "start"]


