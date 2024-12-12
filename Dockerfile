# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

# Copy the rest of the application code to the working directory
COPY . .

# Run Prisma migration and generate scripts
RUN npx prisma generate
RUN npx prisma migrate dev
RUN npm install pm2 -g

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
