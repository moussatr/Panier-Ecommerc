const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Panier = require('./panier');
const Produit = require('./produit');
const PanierProduit = sequelize.define('PanierProduit', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Panier.belongsToMany(Produit, { through: 'PanierProduit' });
  Produit.belongsToMany(Panier, { through: 'PanierProduit' });
  
  
module.exports = PanierProduit;