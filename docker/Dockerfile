# Use the base image with Node.js
FROM node:10

ARG APPMODE
ARG APPENV
ARG STRIPE_PUBLIC_KEY
ARG NYLAS_CLIENT_ID

ENV APPMODE=$APPMODE
ENV APPENV=$APPENV
ENV STRIPE_PUBLIC_KEY=$STRIPE_PUBLIC_KEY
ENV NYLAS_CLIENT_ID=$NYLAS_CLIENT_ID

# Copy the current directory into the Docker image
COPY . /taas-app

# Set working directory for future use
WORKDIR /taas-app

# Install the dependencies from package.json
RUN npm install

RUN npm run build

CMD npm start
