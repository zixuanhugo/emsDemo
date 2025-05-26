FROM node:18
WORKDIR /app
COPY . .
RUN npm install express body-parser swagger-ui-express jsmodbus
EXPOSE 3000
CMD ["node", "index.js"]
