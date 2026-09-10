const { body, validationResult } = require("express-validator");

async function validateUser(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

const registerUserValidationRules = [
  body("username")
    .isString()
    .withMessage("Username must be string")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3-15 charecter"),

  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
  validateUser,
];

module.exports = { registerUserValidationRules }