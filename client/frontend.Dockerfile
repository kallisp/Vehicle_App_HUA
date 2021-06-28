# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Use an existing docker image as a base
FROM node:13.12.0-alpine AS builder

#Set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent

# Copy all files from current directory to working dir in image
COPY . .

# install node modules and build assets
RUN npm install && npm run build

# production environment

# nginx state for serving content
FROM nginx:stable-alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/build .
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
