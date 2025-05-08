const User = require("../models/userModel");
const { registerValidator, loginValidator } = require("../utilities/userValidators");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    // Validation des informations utilisateur
    const validationResult = registerValidator.validate(req.body, { abortEarly: true });
    if (validationResult.error) {
      return res.status(422).json(validationResult.error);
    }

    // Vérification de l'existence de l'email
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({ error: "An account with this email already exists" });
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Création du nouvel utilisateur
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    newUser.password = undefined; // Masquer le mot de passe

    // Générer un token JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "Account successfully created",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    // Validation des informations utilisateur
    const validationResult = loginValidator.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      return res.status(422).json(validationResult.error);
    }

    // Vérification de l'existence de l'utilisateur
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      return res.status(401).json({ error: "Incorrect email and/or password" });
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(req.body.password, userExist.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect email and/or password" });
    }

    // Masquer le mot de passe de la réponse
    userExist.password = undefined;

    // Générer un token JWT
    const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: `Welcome ${userExist.firstName}`,
      user: userExist,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
};
