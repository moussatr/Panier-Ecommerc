const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Produit = require('./produit');
const DetailsCommande = require('./detailsCommande');

const Commande = sequelize.define('Commande', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Défini comme clé primaire auto-incrémentée
      },
  totalPrice: {
    type: DataTypes.FLOAT,
  },

});


Commande.hasMany(DetailsCommande);
DetailsCommande.belongsTo(Commande);


module.exports = Commande;
