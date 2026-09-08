const musicModel = require("../models/music-model");
const albumModel = require("../models/album-model");

const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storag-service");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.decoded.userId,
  });
  res.status(201).json({
    message: "Music created successfully",
    music,
  });
}
async function createAlbum(req, res) {
  const { title, musicIds } = req.body;
  const album = await albumModel.create({
    title,
    musics: musicIds,
    artist: req.decoded.userId,
  });
  res.status(201).json({
    message: "Album created successfully",
    album,
  });
}

module.exports = { createMusic, createAlbum };
