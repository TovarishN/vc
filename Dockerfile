FROM node:12-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
# RUN npm i typescript@next -g
# RUN npm i ts-node -g
# RUN npm i typeorm -g
RUN npm i
RUN npm run build
#RUN npx typeorm migration:run
EXPOSE 8080
CMD ["npm", "start"]