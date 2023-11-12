import React, { useState, useEffect } from 'react';
import cartService from '../services/panier';
import Cart from '../composants/panier';
import OrderPage from './commande';
import authService from '../services/utilisateur';

const Panier = () => {
  const [panierItems, setPanierItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]); 
  const userId = users.id;
  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const userData = await authService.getLoggedInUser();
        setUsers(userData);
         console.log(userData);
      
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      }
    };
     fetchUser();
    }, []);

  useEffect(() => {
  
    fetchPanier();
  }, [userId]);

  const fetchPanier = async () => {
    try {
      const userId = users.id;
      const panierData = await  cartService.getFromCart(userId);
      setPanierItems(panierData);
      console.log(panierData);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
      setIsLoading(false); 
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const userId = users.id;
      await cartService.addToCart(userId, productId, newQuantity);
      // Rechargez le panier après la mise à jour
      fetchPanier();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité :', error);
    }
  };
 
  const removeFromCart = async (userId, productId) => {
    try {
      const userId = users.id;
      await cartService.removeFromCart(userId, productId);
      fetchPanier();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit du panier :', error);
    }
  }

  return (
    <div>
        
        <Cart
        panierItems={panierItems}
        handleUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={removeFromCart}
        />
        <OrderPage />
        
      
    </div>
  );
};

export default Panier;
