import axios from 'axios';

const getProduit = {
  getProduits: async () => {
    try {
      const response = await axios.get('http://localhost:5000/produits');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default getProduit;