const express = require("express")
const router = express.Router()
const { createMusic } = require("../controllers/music-controllers")
const isLoggedin = require ("../middleware/isLoggedin")
const multer = require("multer")
const upload = multer({
    storage: multer.memoryStorage(),
})

router.post("/create", upload.single("file"), createMusic)

module.exports = router