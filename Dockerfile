# Build Frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy frontend code
COPY mcp-frontend ./mcp-frontend
WORKDIR /app/mcp-frontend

# Install dependencies and build frontend
RUN npm install
RUN npm run build

# Build Backend 
FROM node:20-alpine AS backend-builder

WORKDIR /app

# Install TypeScript globally
RUN npm install -g typescript

# Copy backend package files
COPY package*.json tsconfig*.json ./

# Copy backend code
COPY src ./src
COPY src/resume.json ./src/resume.json  

# Copy frontend build output
COPY --from=frontend-builder /app/mcp-frontend/.next ./mcp-frontend/.next
COPY --from=frontend-builder /app/mcp-frontend/public ./mcp-frontend/public
COPY --from=frontend-builder /app/mcp-frontend/package.json ./mcp-frontend/package.json

# Install backend dependencies
RUN npm install
RUN tsc

# Final Image
FROM node:20-alpine

WORKDIR /app

# Copy backend built files and frontend build
COPY --from=backend-builder /app/dist ./dist
COPY --from=backend-builder /app/mcp-frontend ./mcp-frontend
COPY --from=backend-builder /app/src/resume.json ./src/resume.json
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 4000

CMD ["node", "dist/index.js"]
