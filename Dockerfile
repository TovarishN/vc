FROM node:12-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm i
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]