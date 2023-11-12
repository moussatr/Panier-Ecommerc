const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize')

const Panier = sequelize.define('Panier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Défini comme clé primaire auto-incrémentée
      },
});


module.exports = Panier;