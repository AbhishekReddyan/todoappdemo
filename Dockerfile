# ---- Stage 1: Build React Frontend ----
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ---- Stage 2: Setup Node Backend + Serve Frontend ----
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Copy built frontend to backend public folder
COPY --from=frontend-build /app/frontend/build ./public

# Environment + Port
ENV PORT=80
EXPOSE 80

# Healthcheck (important for ALB)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://localhost/healthz || exit 1

CMD ["npm", "start"]
