import React from 'react'
import { NavLink } from 'react-router-dom'
import menu from '../css/menu.css';


function Menu({ isLoggedIn }) {
  return (
    <div className='menu'>
      <ul>
        <li><NavLink to="/home" className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Accueil</NavLink></li>
        <li><NavLink to="/panier" className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Panier et Paiement</NavLink></li>
        <li><NavLink to="/list-commande" className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Détails commande</NavLink></li>
        <li><NavLink to="/create-produit" className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Créer un produit</NavLink></li>

        {isLoggedIn ?(
              <>
                 <li><NavLink to="/logout" className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Se déconnecter</NavLink></li>
              </>
        ):(
              <>
                <li><NavLink to="/register" className={({ isActive }) => (isActive ? "activeLink" : undefined)}>S'inscrire</NavLink></li>
                <li><NavLink to="/" className={({ isActive }) => (isActive ? "activeLink" : undefined)}>Se connecter</NavLink></li>
              </>
        )}
        </ul>
    </div>
  )
}

export default Menu