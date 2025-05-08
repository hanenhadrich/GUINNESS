import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import bodyParser from 'body-parser';
import cors from 'cors';

// Importation des routes
import todoRoutes from './backend/routes/todoRoutes.js'; 
import reservationRoutes from './backend/routes/reservationRoutes.js'; 
import adherentRoutes from './backend/routes/adherentRoutes.js';
import subscriptionRoutes from './backend/routes/subscriptionRoutes.js';
import userRoutes from './backend/routes/userRoutes.js';

// Chargement des variables d'environnement depuis .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;

// Middleware pour gérer les CORS et analyser les données
app.use(cors()); // Permet les requêtes provenant d'autres domaines
app.use(bodyParser.urlencoded({ extended: true })); // Pour analyser les données de formulaires
app.use(express.json()); // Pour analyser les requêtes JSON

// Connexion à MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
    // Démarrer le serveur si la connexion réussie
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1); // Arrêter l'application si la connexion échoue
  });

// Route de test (s'assurer que l'API fonctionne)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Intégration des routes principales
app.use('/todos', todoRoutes);
app.use('/reservations', reservationRoutes);
app.use('/adherents', adherentRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/users', userRoutes);

// Si aucune des routes ci-dessus ne correspond, renvoyer une erreur 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
