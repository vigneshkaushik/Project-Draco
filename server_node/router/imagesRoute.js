const express = require("express");
const router = express.Router();

// Importing controller function
const {
  createImage,
  uploadImage,
  varyImage,
} = require("../controllers/imagesController");

// Creating route
router.post("/create", createImage);
router.post("/upload", uploadImage);
router.post("/vary", varyImage);

// Exporting routes
module.exports = router;
