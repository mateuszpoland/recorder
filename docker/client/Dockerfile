FROM node:latest

WORKDIR /app

COPY records_client/package.json .

RUN npm install --legacy-peer-deps

COPY records_client/ .

EXPOSE 3000

CMD ["npm", "run", "start"]
