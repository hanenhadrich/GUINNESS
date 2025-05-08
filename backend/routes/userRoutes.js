const express = require('express');
const { register, login } = require('../controllers/usersController');
const checkAuth = require('../middleware/checkAuth'); // Si tu veux protéger certaines routes par un middleware d'authentification

const router = express.Router();

// Route pour l'enregistrement des utilisateurs
router.post('/register', register);

// Route pour la connexion des utilisateurs
router.post('/login', login);

// Exemple d'une route protégée qui nécessite une authentification
// router.get('/profile', checkAuth, (req, res) => {
//   res.status(200).json({ user: req.user }); // Utilisation de l'utilisateur décodé à partir du token
// });

module.exports = router;
