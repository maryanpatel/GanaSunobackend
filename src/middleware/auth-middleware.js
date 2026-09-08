const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  if (!req.cookies.token) {
    return res.status(401).json({
      message: "Need to login first",
    });
  }
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECERT);
    if (decoded.role !== "artist") {
        return res.status(403).json({
          message: "You don't have access to create albums",
        });
      }
      req.decoded = decoded
      next()
    
  } catch (err) {
    return res.status(401).json({
      message: "Internal error at Auth-middleware",
    });
  }
}
module.exports = authArtist