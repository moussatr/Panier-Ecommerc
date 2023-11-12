// DetailsCommande.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import orderService from '../services/commande';
import panier from '../css/panier.css';


const DetailsCommande = () => {
  const { commandeId } = useParams();
  const [detailsCommande, setDetailsCommande] = useState([]);

  useEffect(() => {
    const fetchDetailsCommande = async () => {
      try {
        const detailsCommandeData = await orderService.getDetailsCommande(commandeId);
        console.log(detailsCommande);
        setDetailsCommande(detailsCommandeData);
        console.log(setDetailsCommande(detailsCommandeData));
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la commande :', error);
      }
    };

    fetchDetailsCommande();
  }, [commandeId]);

  return (
    <div className="cart">
      <h2>Détails de la commande N°{commandeId}</h2>
      <div>
        {detailsCommande.map((detail) => (
          <li className="cart-item" key={detail.id}>
            <p className="cart-item-title"> Nom: {detail.name} </p>
            <p className="cart-item-price"> Quantité: {detail.quantity} </p>
            <p className="cart-item-quantity"> Prix unitaire: {detail.price}</p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default DetailsCommande;
