FROM node:alpine AS mean-reyceitas-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build
CMD npm start

EXPOSE 80