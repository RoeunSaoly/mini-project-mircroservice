FROM node:18

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install

EXPOSE 3002

CMD ["node", "index.js"]