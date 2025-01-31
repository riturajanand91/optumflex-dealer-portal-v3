# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /admin-portal

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Build the admin portal
COPY . .
RUN npm start

# Use a lightweight server to serve static files
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the admin-portal port
EXPOSE 4200
