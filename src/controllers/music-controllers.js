const musicModel = require("../models/music-model");
const albumModel = require("../models/album-model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storag-service");

async function createMusic(req, res) {
  if (!req.cookies.token) {
    return res.status(409).json({
      message: "Need to login first",
    });
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECERT);
    if (decoded.role === "user") {
      return res.status(403).json({
        message: "You don't have access to crete an music",
      });
    }

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = new musicModel({
      uri: result.url,
      title,
      artist: decoded.id,
    });
    res.status(201).json({
      message: "Music created successfully",
      music,
    });
  } catch (err) {
    return res.status(401).json({
      message: "unothorized",
    });
  }
}
async function createAlbum(req, res) {
  if (!req.cookies.token) {
    return res.status(401).json({
      message: "Need to login first",
    });
  }
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECERT)

    if( decoded.role !== "artist") {
      return res.status(403).json({
        message: "You don't have access to create albums"
      })

      const { title, musicIds } = req.body

      const album = await albumModel.create({
        title,
        musics: musicIds,
        artist: decoded.id
      })
      res.status(201).json({
        message: "Album created successfully ",
        album,
      })
    }
  } catch (err) {
    return res.status(401).json({
      message: "Internal error at createalbum",
    });
  }
}
module.exports = { createMusic,createAlbum };
