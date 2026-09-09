const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    return res.status(409).json({
      message: "Need to login first",
    });
  }

  jwt.verify( req.cookies.token, process.env.JWT_SECERT, function (err, decoded) {
    if(err) {
      return res.status(401).json({
        message: " internal error occured at isLoggedin middaleware"
      })
      
      
    }
    req.user = decoded
  });

  next();
};
