// // utils/cloudinary.js
import env from '../../../../env/env';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: env.CLD_API_NM,
  api_key: env.CLD_API_KEY,
  api_secret: env.CLD_API_SECRET
});

module.exports = cloudinary;
// s

