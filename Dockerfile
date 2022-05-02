FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

EXPOSE 3001

COPY . .

ENTRYPOINT ["npm", "start"]