// OrderPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import orderService from '../services/commande'; // Importez votre service de commande
import listCommande from '../css/listCommande.css';
import authService from '../services/utilisateur';


function ListCommande() {
  const [orders, setOrders] = useState([]);
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
    // Utilisez votre service pour récupérer les commandes de l'utilisateur
    orderService.getOrdersByUserId(userId)
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  return (
    <div className='list-commande'>
      <h1>La liste de mes commandes</h1>
      <div>
        {orders.map((order) => (
          <li key={order.id}>
          <Link to={`/details-commande/${order.id}`}>
            Commande N°{order.id} - Prix total : {order.totalPrice} €
          </Link>
        </li>
        ))}
      </div>
    </div>
  );
}

export default ListCommande;
