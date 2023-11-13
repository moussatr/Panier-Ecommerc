const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Panier = require('./panier');
const Commande = require('./commande');

const Produit = sequelize.define('Produit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Défini comme clé primaire auto-incrémentée
      },
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  // Autres champs liés aux produits
});



module.exports = Produit;