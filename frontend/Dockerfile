# Multi-stage Dockerfile for frontend (build with Node, serve with nginx)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# optional: copy custom nginx.conf if you add one
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
