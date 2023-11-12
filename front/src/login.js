import React, { useState } from 'react';
import authService from './services/utilisateur';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import register_login from '../src/css/register_login.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login(email, password);
      console.log(response);
      onLogin();
      navigate('/home');
    } catch (error) {
      // Gérez les erreurs d'authentification ici
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className='container'>
      <h2>Connexion</h2>
      <form className='form' onSubmit={handleLogin}>
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
        <button type="submit">Se connecter</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <Link to="/register"><strong>Pas encore inscrit ? S'inscrire</strong></Link>
    </div>
  );
}

export default LoginPage;
