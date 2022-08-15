FROM node:16-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --quiet 
COPY . .
#RUN npm run build
EXPOSE 4200
CMD npm start