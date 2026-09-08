const express = require("express")
const router = express.Router()
const { createMusic,createAlbum } = require("../controllers/music-controllers")
const authArtist = require("../middleware/auth-middleware")
const isLoggedin = require ("../middleware/isLoggedin")
const multer = require("multer")
const upload = multer({
    storage: multer.memoryStorage(),
})

router.post("/create", authArtist, upload.single("file"), createMusic)
router.post("/album", authArtist, upload.none(), createAlbum)

module.exports = router