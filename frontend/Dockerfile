# Etapa 1: Build do React
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./

# CORREÇÃO CRÍTICA: --include=dev garante que o Vite seja instalado
# mesmo que o Coolify defina NODE_ENV=production
RUN npm install --include=dev

COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx para rodar o site
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]