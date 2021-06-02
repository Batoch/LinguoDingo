FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --quiet
RUN npm run build
COPY /linguo_reactjsapp /linguo_reactjsapp
EXPOSE 80
CMD [ "npm", "start" ]
