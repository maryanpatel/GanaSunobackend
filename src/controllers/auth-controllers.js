const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  const { username, email, password, role } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists)
    return res.status(409).json({
      message: "User Already Exist",
    });

  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      return res.status(500).json({
        message: " internal error from hashing ",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password: hash,
      role,
    });
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECERT,
    );

    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  });
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({
      username,
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    
    await bcrypt.compare( password, user.password, function (err, result) {
      if ( err ) {
        return res.status(500).json({
          message: " Internal error occured at password checking",
        });
      }
      if (!result) {
        return res.status(401).json({
          message: " Invalid credentials",
        });
      }
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECERT,
      );
      res.cookie("token", token);
      res.status(201).json({
        message: "User login successfully",
        user,
        token,
      });
    });
  } catch {
    res.status(500).json({
      message: " internal error from loginuser controller",
    });
  }
}
module.exports = { registerUser, loginUser };
