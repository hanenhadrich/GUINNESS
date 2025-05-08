const User = require("../models/userModel");
const { registerValidator, loginValidator } = require("../utilities/userValidators");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

const registerUser = async (req, res) => {
  try {    
    // 1) get user information (req.body)
    // 2) validate req.body (Joi)
    const validationResult = registerValidator.validate(req.body, { abortEarly: true })
    if (validationResult.error) {
      return res.status(422).json(validationResult.error)
    }
    // 3) check email existence (User model)
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(401).json({ error: "An account with this email already exist" })
    }
    // 4) encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(req.body.password, salt);
    // 5) create new user
    const newUser = await User.create({ ...req.body, password: hashedPassowrd });
    newUser.password = undefined;
    const token = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET, { expiresIn: "1d"});
    res.status(201).json({ 
      message: "Account successfully created", 
      user: newUser,
      token,
    });
  } catch (error) {    
    console.log(error);
    res.status(500).json(error);
  }
}

const loginUser = async (req, res) => {
  try {
    // 1) get user information (req.body)
    // 2) validate req.body (Joi)
    const validationResult = loginValidator.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      return res.status(422).json(validationResult.error)
    }    
    // 3) check email existence (User model)
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      return res.status(401).json({ error: "Wrong email and/or password" }) // to protect our users privacy
    }
    // 4) compare password
    const passwordMatch = await bcrypt.compare(req.body.password, userExist.password);
    console.log("passwordMatch: ", passwordMatch);
    // if (passwordMatch == false || passwordMatch == null || or any other falsy value) {
    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong email and/or password" })
    }
    // 5) log user in
    userExist.password = undefined;
    const token = jwt.sign({ userId: userExist._id}, process.env.JWT_SECRET, { expiresIn: "1d"});
    res.status(200).json({
      message: `Welcome ${userExist.firstName}`,
      userExist,
      token
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(error);    
  }
}

module.exports = {
  getUsers,
  registerUser,
  loginUser
}