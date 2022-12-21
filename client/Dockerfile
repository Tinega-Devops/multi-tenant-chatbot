FROM node:14-slim as builder
# Set the working directory to /app inside the container
WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80

EXPOSE 443
# Start nginx
CMD ["nginx", "-g", "daemon off;"]

