FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY linguo_reactjsapp linguo_reactjsapp
RUN npm install --quiet
RUN npm run build
EXPOSE 80
CMD [ "npm", "start" ]
