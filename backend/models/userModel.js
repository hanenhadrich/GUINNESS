const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Définition du schéma de l'utilisateur
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Validation de l'email
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Champ role pour différencier les utilisateurs
    avatar: { type: String, default: "" }, // Optionnel, pour stocker l'avatar de l'utilisateur
  },
  { timestamps: true }
);

// Hachage du mot de passe avant de sauvegarder l'utilisateur
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next(); // Si le mot de passe n'est pas modifié, ne pas hacher
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe lors de la connexion
UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Création du modèle utilisateur
const User = mongoose.model("User", UserSchema);

module.exports = User;
