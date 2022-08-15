FROM node:16-alpine as build
# Set the working directory
WORKDIR /usr/local/app
# Add the source code to app
COPY ./ /usr/local/app/
RUN npm install --quiet 
# Generate the build of the application
RUN npm run build
# Use official nginx image as the base image
FROM nginx:latest
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/reyceitas-ang /usr/share/nginx/html
#RUN npm run build
EXPOSE 80