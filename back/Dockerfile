FROM node:lts

WORKDIR /back
COPY package.json .
RUN npm install
COPY . .

# Assurez-vous que le fichier nodemon a les bonnes permissions
RUN chmod +x /usr/local/bin/nodemon

CMD npm start
