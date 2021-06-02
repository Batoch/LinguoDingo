FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN ls
RUN npm run build
RUN npm install --quiet
EXPOSE 80
CMD [ "npm", "start" ]
