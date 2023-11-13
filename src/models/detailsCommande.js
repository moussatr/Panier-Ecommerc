const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Produit = require('./produit');
const Commande = require('./commande');

const DetailsCommande = sequelize.define('DetailsCommande', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Défini comme clé primaire auto-incrémentée
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
 
});

// Définie l'association Many-to-One entre DetailsCommande et Produit
DetailsCommande.belongsTo(Produit);
Produit.hasMany(DetailsCommande);



module.exports = DetailsCommande;