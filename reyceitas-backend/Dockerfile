FROM node:16-alpine
WORKDIR /node-app
COPY package*.json ./
RUN npm install --quiet
RUN npm install nodemon -g --quiet
#RUN mkdir -p /uploads
COPY . . 
EXPOSE 8999
CMD nodemon -L --watch . index.js