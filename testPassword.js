import bcrypt from 'bcryptjs';

// Test avec un mot de passe en clair
const plainPassword = '112233';
const hashedPassword = '$2b$10$YBlzvxjsNtNPKODWaCiSxO9JoINaZFUtXf3LbwK7NMtaWQ9OtjNga'; // Remplace par un hachage réel de ta DB

// Comparaison du mot de passe
bcrypt.compare(plainPassword, hashedPassword)
  .then((match) => {
    console.log("Password match result:", match); // True si les mots de passe correspondent
  })
  .catch((error) => {
    console.error("Error comparing passwords:", error);
  });
