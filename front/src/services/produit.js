import axios from 'axios';

const produitService = {
  getProduits: async () => {
    try {
      const response = await axios.get('http://localhost:5000/produits');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createProduit: async (productData) => {
    try {
      const response = await axios.post('http://localhost:5000/produits', productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  

};

export default produitService;