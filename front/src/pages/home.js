import React, { useState, useEffect } from 'react';
import getProduit from '../services/produit';
import cartService from '../services/panier';
import listProduit from '../css/listProduit.css';
import authService from '../services/utilisateur';

const Home = () => {
  const [produits, setProduits] = useState([]);
  const [users, setUsers] = useState([]); 
  const [quantity, setQuantity] = useState(1);
  const [flashMessage, setFlashMessage] = useState('');
  

  useEffect(() => {
 
    const fetchProduits = async () => {
      try {
        const productData = await getProduit.getProduits();
        setProduits(productData);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        
      }
    };

    fetchProduits();
  }, []);

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
 
  const userId = users.id;
  const handleAddToCart = async (productId) => {
    try {
      await cartService.addToCart(userId, productId, quantity);
      setFlashMessage('Produit ajouté au panier avec succès!');
      setTimeout(() => {
        setFlashMessage('');
      }, 500);
      // Mettez à jour l'état de votre application pour refléter que le produit a été ajouté au panier
      console.log('Produit ajouté au panier.');
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier :', error);
    }
  };


  return (
    <div>
      {flashMessage && (
        <div className="flash-message">
          <p>{flashMessage}</p>
        </div>
      )}
         <div className="product-list">
          {produits.map((produit) => (
        <div key={produit.id} className="product-item">
          <h3 className="product-title">{produit.name}</h3>
          <p  className="product-price">Prix : €{produit.price}</p>
          <p  className="product-price">Stock : {produit.stock}</p>
          <button className="checkout-button" onClick={() => handleAddToCart(produit.id)}>Ajouter au panier</button>
         
        </div>
      ))}
    </div>
  
    </div> 
  );
};

export default Home;
