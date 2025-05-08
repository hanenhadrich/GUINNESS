const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

const checkAuth = async (req, res, next) => {
  try {
    // get token from headers
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "No token provided, authorization denied"});
    }
    // decode token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decodedToken);
    // get userId from token payload
    const userId = decodedToken.userId;
    // check if user exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Invalid token"})
    }
    req.user = user;
    next();    
  } catch (error) {
    return res.status(401).json({ error: "Invalid/Expired token" });
  }
}

module.exports = checkAuth;