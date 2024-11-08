# Use official Node.js image from Docker Hub
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY backend/ ./

# Expose the backend port (e.g., 4000)
EXPOSE 4000

# Start the backend server
CMD ["npm", "start"]
