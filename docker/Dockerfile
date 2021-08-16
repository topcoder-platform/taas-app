# Use the base image with Node.js
FROM node:10

ARG APPMODE
ARG APPENV
ARG STRIPE_PUBLIC_KEY

ENV APPMODE=$APPMODE
ENV APPENV=$APPENV
ENV STRIPE_PUBLIC_KEY=$STRIPE_PUBLIC_KEY

# Copy the current directory into the Docker image
COPY . /taas-app

# Set working directory for future use
WORKDIR /taas-app

# Install the dependencies from package.json
RUN npm install

RUN npm run build

CMD npm start
