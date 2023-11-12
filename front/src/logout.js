// LogoutPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './services/utilisateur';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Appel du service de déconnexion au chargement de la page
    async function handleLogout() {
      try {
        await authService.logout();
        console.log('dec re');
        // Redirigez l'utilisateur vers la page d'accueil ou une autre page après la déconnexion
        // navigate('/login');
        window.location.href = '/';
      } catch (error) {
        console.error('Erreur de déconnexion :', error);
        // Gérez les erreurs de déconnexion, par exemple en affichant un message d'erreur
        // navigate('/login'); // Redirigez l'utilisateur vers la page d'accueil en cas d'erreur
      }
    }

    handleLogout();
  }, []);

  return (
    <div>
      <p>Vous êtes en cours de déconnexion...</p>
      {/* Vous pouvez afficher un message de déconnexion en cours ici */}
    </div>
  );
}

export default LogoutPage;
