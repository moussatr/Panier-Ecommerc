// OrderPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import orderService from '../services/commande'; // Importez votre service de commande
import authService from '../services/utilisateur';

function OrderPage() {
  const [flashMessage, setFlashMessage] = useState('');
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

  const handleCreateOrder = () => {
    // Utilisez votre service pour créer une nouvelle commande
    orderService.createOrder(userId)
      .then((data) => {
        // Vous pouvez gérer la réponse ici si nécessaire
        console.log('Commande créée avec succès');
        setFlashMessage('Paiement effectué avec succès !');
      setTimeout(() => {
        setFlashMessage('');
      }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
       {flashMessage && (
        <div className="flash-message">
          <p>{flashMessage}</p>
        </div>
      )}
    
        <button className="checkout-button" onClick={handleCreateOrder}>Passer la commande</button>
    
    </div>
  );
}

export default OrderPage;
