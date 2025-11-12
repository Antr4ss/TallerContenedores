# Utiliza una imagen Node para construir la app
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Usa un servidor web ligero para servir los archivos estáticos
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Opcional: copia un archivo de configuración custom de nginx
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
