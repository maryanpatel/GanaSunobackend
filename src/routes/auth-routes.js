const express = require("express")
const router = express.Router()
const { registerUser,loginUser } = require('../controllers/auth-controllers')
const validationRules = require("../middleware/validation-middleware")

router.post("/register", validationRules.registerUserValidationRules, registerUser)
router.post("/login", loginUser)
module.exports = router