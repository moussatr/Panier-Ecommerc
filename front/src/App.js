import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Menu from './composants/menu';
import Home from './pages/home';
import Panier from './pages/panier';
import OrderPage from './pages/commande';
import RegisterPage from './register';
import LoginPage from './login';
import { useNavigate } from 'react-router-dom';
import LogoutPage from './logout';
import ListCommande from './pages/listCommande';
import DetailsCommande from './pages/detailsCommande';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour gérer l'authentification
  const navigate = useNavigate();

  // Fonction de rappel pour gérer l'authentification réussie
  const onLogin = () => {
    setIsLoggedIn(true); // Mettez à jour l'état d'authentification
  };

  return (
    <>
      {isLoggedIn && <Menu isLoggedIn={true} />}
       
      <Routes>
        {/* Mettez la route de login en premier */}
        <Route path='/' element={<LoginPage onLogin={onLogin} />} />
        
        {isLoggedIn ? (
          // Si l'utilisateur est connecté, affichez les autres pages
          <>
            <Route path='/home' element={<Home />} /> 
            <Route path='/panier' element={<Panier />} />
            <Route path='/list-commande' element={<ListCommande />} />
            <Route path='/details-commande/:commandeId' element={<DetailsCommande />} />
            <Route path='/logout' element={<LogoutPage />} />
          </>
        ) : (
          // Si l'utilisateur n'est pas connecté, affichez les pages de connexion et d'inscription
          <>
            <Route path='/register' element={<RegisterPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
