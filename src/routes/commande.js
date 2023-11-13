const express = require('express');
const commandeModel = require('../models/commande');
const produitModel = require('../models/produit');
const panierModel = require('../models/panier');
const detailsCommandeModel = require('../models/detailsCommande');

let router = express.Router();

// Créer une nouvelle commande
router.post('/creer-commande/:UtilisateurId', async (req, res) => {
  try {
    const UtilisateurId = req.params.UtilisateurId;
    // Recherchez le panier de l'utilisateur
    const cart = await panierModel.findOne({ where: { UtilisateurId } });
    if (!cart) {
      return res.status(404).json({ error: 'Panier non trouvé' });
    }
    // Créez une nouvelle commande
    const order = await commandeModel.create({
      UtilisateurId,
      totalPrice: 0, // Vous pouvez calculer le prix total à partir du panier
    });
    // Récupérez les produits du panier
    const cartProducts = await cart.getProduits();
    for (const productInfo of cartProducts) {
      const { id: ProduitId, PanierProduit: { quantity } } = productInfo;  
      await detailsCommandeModel.create({
        CommandeId: order.id,
        ProduitId,
        quantity,
        // Assurez-vous que le prix est déjà correct dans votre modèle de produit
        price: productInfo.price,
        name: productInfo.name,
      }); 
      const newStock = productInfo.stock - quantity;
      // Mise à jour du stock dans la base de données
      await produitModel.update({ stock: newStock }, { where: { id: ProduitId } });  
      const totalPrice = order.totalPrice + productInfo.price * quantity;
      // Mettez à jour le prix total de la commande dans la base de données
      await order.update({ totalPrice });
    }
   // Videz le panier de l'utilisateur
    await cart.setProduits([]);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Impossible de créer la commande' });
  }
});

// Récupérer les commandes d'un utilisateur
router.get('/get-orders/:UtilisateurId', async (req, res) => {
  try {
    const UtilisateurId = req.params.UtilisateurId;
    // Recherchez les commandes de l'utilisateur
    const orders = await commandeModel.findAll({ where: { UtilisateurId } });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Impossible de récupérer les commandes' });
  }
});

router.get('/details/:commandeId', async (req, res) => {
  try {
    const commandeId = req.params.commandeId;
    const detailsCommande = await detailsCommandeModel.findAll({
      where: { CommandeId: commandeId },
    });
    res.json(detailsCommande);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Impossible de récupérer les détails de la commande' });
  }
});

module.exports = router;
