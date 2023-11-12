import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Remplacez par l'URL de votre API

const orderService = {
  createOrder: async (UtilisateurId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/commandes/creer-commande/${UtilisateurId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la commande :', error);
      throw error;
    }
  },
  
  getOrdersByUserId: async (UtilisateurId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/commandes/get-orders/${UtilisateurId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de ytrrr la récupération des commandes :', error);
      throw error;
    }
  },

  getDetailsCommande: async (commandeId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/commandes/details/${commandeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;
