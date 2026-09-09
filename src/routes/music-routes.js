const express = require("express")
const router = express.Router()
const { createMusic,createAlbum, getMusics, getAlbums, getAlbumById } = require("../controllers/music-controllers")
const authArtist = require("../middleware/auth-middleware")
const isLoggedin = require ("../middleware/isLoggedin")
const multer = require("multer")
const upload = multer({
    storage: multer.memoryStorage(),
})

router.post("/create", authArtist, upload.single("file"), createMusic)
router.post("/album", authArtist, upload.none(), createAlbum)
router.get("/", isLoggedin, getMusics)
router.get("/albums", isLoggedin, getAlbums)
router.get("/albums/:albumId", isLoggedin, getAlbumById)


module.exports = router