import React, { useState } from 'react';
import authService from './services/utilisateur';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import register_login from '../src/css/register_login.css'



function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await authService.register(username, email, password);
        // Stockez le token JWT dans le stockage local ou dans l'état global (par exemple, Redux)
        // Redirigez l'utilisateur vers une autre page
        navigate('/');
      } catch (error) {
        // Gérez les erreurs d'inscription, par exemple en affichant un message d'erreur
      }

  }

  return (
    <div className='container'>
      <h2>Enregistrement</h2>
      <form className='form' onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">S'enregistrer</button>
      </form>
      {/* Formulaire de connexion ici */}
      <Link to="/"><strong>Déjà inscrit ? Se connecter</strong></Link>
    </div>
  );
}

export default RegisterPage;
