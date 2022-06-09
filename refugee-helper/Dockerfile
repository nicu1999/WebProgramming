FROM node:17-alpine

WORKDIR /frontend

COPY . .

RUN npm install

RUN npm install axios

EXPOSE 8080

CMD ["cd", "frontend"]

CMD ["npm", "run", "serve"]