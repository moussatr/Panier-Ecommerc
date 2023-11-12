const express = require('express');
const utilisateurModel = require('../models/utilisateur');
const {req, res} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await utilisateurModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà enregistré.' });
    }
    // Hacher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créer un nouvel utilisateur
    const newUser = await utilisateurModel.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Rechercher l'utilisateur par email
    let user = await utilisateurModel.findOne({ where: { email } }); 
    if (!user) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet email.' });
    }
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }
    // Générer un token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, 'Secret12', {
      expiresIn: '1h', // Durée de validité du token (par exemple, 1 heure)
    });
    req.session.user = user;
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
});


router.post('/logout', async (req, res) => {
  // Supprimez le cookie de session pour déconnecter l'utilisateur
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la déconnexion :', err);
      return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
    }
    // Répondez avec succès après la déconnexion
    return res.json({ message: 'Déconnexion réussie' });
});
});

const checkSession = (req, res, next) => {
  if (!req.session.user) {
    // Redirigez l'utilisateur vers la page de connexion (ou renvoyez une erreur, selon vos besoins)
    return res.status(401).json({ message: 'Vous devez être connecté pour accéder à cette ressource' });
  }
  // La session est valide, passez à la route suivante
  next();
};

router.get("/me", checkSession, async (request, response) => {  
  return response.status(200).json(request.session.user);
});

module.exports = router;
