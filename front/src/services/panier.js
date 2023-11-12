// cartService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Mettez l'URL de votre serveur

const cartService = {
  addToCart: async (UtilisateurId, productId, quantity) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/paniers/${UtilisateurId}/add-au-panier/${productId}`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeFromCart: async (UtilisateurId, productId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/paniers/${UtilisateurId}/remove/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFromCart: async (UtilisateurId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/paniers/${UtilisateurId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};


export default cartService;
