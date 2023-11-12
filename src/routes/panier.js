const express = require('express');
const panierModel = require('../models/panier');
const produitModel = require('../models/produit');
const UtilisateurModel = require('../models/utilisateur');
const {req, res} = require('express');

let router = express.Router();

// Ajouter un produit au panier
router.post('/:UtilisateurId/add-au-panier/:productId', async (req, res) => {
  const UtilisateurId = req.params.UtilisateurId;
  const productId = req.params.productId;
  const { quantity } = req.body;
  try {
    // Vérifiez si l'utilisateur et le produit existent
    const user = await UtilisateurModel.findByPk(UtilisateurId);
    const product = await produitModel.findByPk(productId);
    if (!user || !product) {
      return res.status(404).json({ error: 'Utilisateur ou produit non trouvé' });
    }
    // Vérifiez si le produit est en stock
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Stock insuffisant' });
    }
    // Recherchez le panier de l'utilisateur ou créez-le s'il n'existe pas
    let cart = await panierModel.findOne({ where: { UtilisateurId} });
    if (!cart) {
      cart = await panierModel.create({ UtilisateurId });
    }
    // Ajoutez le produit au panier
    await cart.addProduit(product, { through: { quantity } });
    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Impossible d\'ajouter le produit au panier' });
  } 
});

// Supprimer un produit du panier
router.delete('/:UtilisateurId/remove/:productId', async (req, res) => {
  const UtilisateurId = req.params.UtilisateurId;
  const productId = req.params.productId;
  try {
    // Vérifiez si l'utilisateur et le produit existent
    const user = await UtilisateurModel.findByPk(UtilisateurId);
    const product = await produitModel.findByPk(productId);
    if (!user || !product) {
      return res.status(404).json({ error: 'Utilisateur ou produit non trouvé' });
    }
    // Recherchez le panier de l'utilisateur
    const cart = await panierModel.findOne({ where: { UtilisateurId } });
    if (cart) {
      // Supprimez le produit du panier
      await cart.removeProduit(product);
      return res.json({ message: 'Produit supprimé du panier' });
    } else {
      return res.status(404).json({ error: 'Panier non trouvé pour cet utilisateur' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Impossible de supprimer le produit du panier' });
  }
});

// Récupérer le panier d'un utilisateur par son ID
router.get('/:UtilisateurId', async (req, res) => {
  try {
    const UtilisateurId = req.params.UtilisateurId;
    // Recherchez le panier de l'utilisateur en utilisant le modèle approprié (par exemple, Cart)
    const userCart = await panierModel.findOne({ where: { UtilisateurId } });
    if (!userCart) {
      return res.status(404).json({ error: 'Panier introuvable pour cet utilisateur' });
    }
    // Récupérez les produits associés à ce panier (assurez-vous d'avoir défini la relation appropriée dans le modèle)
    const cartItems = await userCart.getProduits();
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération du panier" });
  }
});

module.exports = router;