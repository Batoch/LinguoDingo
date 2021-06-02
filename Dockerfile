FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm install --quiet
RUN ls
RUN npm run build
EXPOSE 80
CMD [ "npm", "start" ]
