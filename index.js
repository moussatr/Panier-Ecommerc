const sequelize = require('./src/sequelize');
const morgan = require('morgan');
const Utilisateur = require('./src/models/utilisateur');
const Panier = require('./src/models/panier');
const Produit = require('./src/models/produit');
const Commande = require('./src/models/commande');
const PanierProduit = require('./src/models/PanierProduit');
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
// Configurez express-session
app.use(
  session({
    secret: 'Secret12', // Un secret pour signer les cookies de session
    resave: false, // Ne réenregistrez pas la session si elle n'a pas été modifiée
    saveUninitialized: false, // Enregistrez la session même si elle n'a pas été initialisée
    cookie: {
      secure: false, // Réglez à true en production si vous utilisez HTTPS
      maxAge: 3600000, // Durée de validité du cookie de session (en millisecondes)
    },
  })
);
const cors = require('cors');

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000', // Autorise l'origine de l'application front-end
}));


sequelize.sync({ force: false }).then(() => {
  console.log('Base de données synchronisée');
}).catch((err) => {
  console.error('Erreur de synchronisation de la base de données :', err);
});

const utilisateurRouter = require('./src/routes/utilisateur');
const produitRouter = require('./src/routes/produit');
const panierRouter = require('./src/routes/panier');
const commandeRouter = require('./src/routes/commande');



app.use('/utilisateurs', utilisateurRouter);
app.use('/produits', produitRouter);
app.use('/paniers', panierRouter);
app.use('/commandes', commandeRouter);



const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});