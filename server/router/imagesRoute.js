const express = require("express");
const router = express.Router();

// Importing controller function
const { createImage, uploadImage } = require("../controllers/imagesController");

// Creating route
router.post("/create", createImage);
router.post("/upload", uploadImage);

// Exporting routes
module.exports = router;
