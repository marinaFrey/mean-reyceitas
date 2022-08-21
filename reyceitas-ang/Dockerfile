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
ARG CERT_STR
ARG PRIVATE_KEY_STR
ARG API_URL
ARG CLIENT_ID
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/reyceitas-ang /usr/share/nginx/html
RUN mkdir -p /etc/nginx/certs
RUN echo ${API_URL} > API
RUN echo ${CERT_STR} > /etc/nginx/certs/cert.crt
RUN echo ${PRIVATE_KEY_STR} > /etc/nginx/certs/cert.key
RUN sed -i -e 's/ /\n/g' /etc/nginx/certs/cert.crt
RUN sed -i '1 i\-----BEGIN CERTIFICATE-----' /etc/nginx/certs/cert.crt
RUN sed -i -e '$a-----END CERTIFICATE-----' /etc/nginx/certs/cert.crt
RUN sed -i -e 's/ /\n/g' /etc/nginx/certs/cert.key
RUN sed -i '1 i\-----BEGIN PRIVATE KEY-----' /etc/nginx/certs/cert.key 
RUN sed -i -e '$a-----END PRIVATE KEY-----' /etc/nginx/certs/cert.key 
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN export API_URL=${API_URL}
RUN export CLIENT_ID=${CLIENT_ID}
RUN envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;'"]
#CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
EXPOSE 80
EXPOSE 443