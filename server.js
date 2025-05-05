import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import bodyParser from 'body-parser';
import cors from 'cors';

import todoRoutes from './backend/routes/todoRoutes.js'; 
import reservationRoutes from './backend/routes/reservationRoutes.js'; 
import adherentRoutes from './backend/routes/adherentRoutes.js';
import subscriptionRoutes from './backend/routes/subscriptionRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use('/todos', todoRoutes);
app.use('/reservations', reservationRoutes);
app.use('/adherents', adherentRoutes);
app.use('/subscriptions', subscriptionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
