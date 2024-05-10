const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLD_API_NM,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET
});

module.exports = cloudinary;


