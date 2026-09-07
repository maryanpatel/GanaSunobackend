const express = require("express")
const router = express.Router()
const { createMusic,createAlbum } = require("../controllers/music-controllers")
const isLoggedin = require ("../middleware/isLoggedin")
const multer = require("multer")
const upload = multer({
    storage: multer.memoryStorage(),
})

router.post("/create", upload.single("file"), createMusic)
router.post("/album", upload.single("file"), createAlbum)

module.exports = router