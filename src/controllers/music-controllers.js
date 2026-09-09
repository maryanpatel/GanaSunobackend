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

async function getMusics(req, res) {
  const musics = await musicModel.find().populate("artist", "email username");
  res.status(201).json({
    message: "musics fethch successfully",
    musics,
  });
}

async function getAlbums(req, res) {
  const albums = await albumModel.find().select("title artist").populate("artist", "email username");
  res.status(201).json({
    message: "Albums fethch successfully",
    albums,
  });
}

async function getAlbumById(req, res){
  try{
    const album = await albumModel.findOne({ _id: req.params.albumId}).populate("musics").populate("artist", "email username")
    res.status(201).json({
      message: "album fetch successfully ",
      album,
    })

  }catch(err){
    res.status(401).json({
      message: "internal error occured at finding album"
    })
  }
}

module.exports = { createMusic, createAlbum, getMusics, getAlbums, getAlbumById };
