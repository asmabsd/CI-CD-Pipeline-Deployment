# Étape 1 : Build Angular
FROM node:16 AS build-stage

WORKDIR /app

# Copier package.json et installer dépendances
COPY pidev/package*.json ./
RUN npm install

# Copier le code source Angular
COPY pidev/ .

# Build en mode production
RUN npm run build -- --configuration=production

# Étape 2 : Servir avec Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers générés vers Nginx
COPY --from=build-stage /app/dist/pidev /usr/share/nginx/html

EXPOSE 80