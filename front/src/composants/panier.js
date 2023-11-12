import React, { useState, useEffect } from 'react';
import authService from '../services/utilisateur';
import panier from '../css/panier.css';

const Cart = ({ panierItems, handleUpdateQuantity, onRemoveFromCart }) => {
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
  return (
    <div className="cart">
      <h2>Votre Panier</h2>
      <div>
        {panierItems.map((item) => (
          <li className="cart-item" key={item.PanierProduit.produitId}>
            <div>
              <span className="cart-item-title">{item.name}</span><br /><p>  </p>
              <span  className="cart-item-price">Prix unitaire : ${item.price}</span>
            </div>
            <div>
              <span className="cart-item-quantity">Quantité : {item.PanierProduit.quantity}</span><p>  </p>
              <button className="checkout-button" onClick={() => handleUpdateQuantity(item.id, item.PanierProduit.quantity - 1)}>-</button>
              <button className="checkout-button" onClick={() => handleUpdateQuantity(item.id, item.PanierProduit.quantity + 1)}>+</button>
            </div>
            <div>
              <span  className="cart-total">Prix total : ${item.price * item.PanierProduit.quantity}</span>
              <button className="checkout-button" onClick={() => onRemoveFromCart(userId, item.PanierProduit.ProduitId)}>Supprimer</button>
            </div>
            
          </li>
        ))}
        
      </div>
    </div>
  );
};

export default Cart;
