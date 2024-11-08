# Use official Node.js image from Docker Hub
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ ./

# Build the frontend for production
RUN npm run build

# Expose the frontend port (e.g., 3000)
EXPOSE 3000

# Serve the build directory using a simple static server
CMD ["npx", "serve", "build"]
