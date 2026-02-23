FROM node:18

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install

EXPOSE 3003

CMD ["node", "index.js"]




