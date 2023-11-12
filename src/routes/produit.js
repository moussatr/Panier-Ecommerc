const express = require('express');
const produitModel = require('../models/produit');
const {req, res} = require('express');

let router = express.Router();

router.post('/', async (req, res) => {
    try {
      const { name, price, stock } = req.body;
      const product = await produitModel.create({ name, price, stock });
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Impossible de créer le produit" });
    }
  });

router.get('/', async (req, res) => {
    try {
      const products = await produitModel.findAll();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Impossible de récupérer les produits" });
    }
  });

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await produitModel.findByPk(productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Produit non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Impossible de récupérer le produit" });
    }
  });
  
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, stock } = req.body;
    try {
      const product = await produitModel.findByPk(productId);
      if (product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        await product.save();
        res.json(product);
      } else {
        res.status(404).json({ error: "Produit non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Impossible de mettre à jour le produit" });
    }
  });
  
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await produitModel.findByPk(productId);
      if (product) {
        await product.destroy();
        res.json({ message: "Produit supprimé avec succès" });
      } else {
        res.status(404).json({ error: "Produit non trouvé" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Impossible de supprimer le produit" });
    }
  });

module.exports = router;