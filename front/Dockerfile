# Stage 1
FROM node:lts as build-stage

# Définir le répertoire de travail
WORKDIR /front

# Copier le fichier package.json et installer les dépendances
COPY package.json .
RUN npm install

# Copier le reste des fichiers
COPY . .


# Construire l'application React
RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

# Copier les fichiers construits à partir de la première étape
COPY --from=build-stage /front/build /usr/share/nginx/html

# Exposer le port défini dans votre environnement React
EXPOSE $REACT_DOCKER_PORT

# Commande pour démarrer Nginx en mode daemon
CMD nginx -g 'daemon off;'
