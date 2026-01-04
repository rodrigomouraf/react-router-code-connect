# Development Dockerfile for NestJS Backend with Hot Reload
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for hot reload)
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start in development mode with watch
CMD ["npm", "run", "start:dev"]

