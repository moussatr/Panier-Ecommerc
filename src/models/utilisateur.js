const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Panier = require('./panier');
const Commande = require('./commande');

const Utilisateur = sequelize.define('Utilisateur', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Défini comme clé primaire auto-incrémentée
      },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
 
});

// Définie l'association One-to-One entre Utilisateur et Panier
Utilisateur.hasOne(Panier);
Panier.belongsTo(Utilisateur);

Utilisateur.hasMany(Commande);
Commande.belongsTo(Utilisateur);



module.exports = Utilisateur;