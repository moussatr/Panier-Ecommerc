import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 

const authService = {
  // Service d'inscription
  register: async (username, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/utilisateurs/register`, {
        username,
        email,
        password,
      });
      return response.data; // Le serveur renvoie généralement un token JWT pour la session utilisateur
    } catch (error) {
      throw error;
    }
  },

  // Service de connexion
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/utilisateurs/login`, {
        email,
        password,
      },
      { withCredentials: true },
      );
      return response.data; // Le serveur renvoie généralement un token JWT pour la session utilisateur
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/utilisateurs/logout`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getLoggedInUser: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/utilisateurs/me`,{ withCredentials: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
