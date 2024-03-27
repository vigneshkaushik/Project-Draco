const express = require("express");
const router = express.Router();

// Importing controller function
const { createImage } = require("../controllers/imagesController");

// Creating route
router.post("/create", createImage);

// Exporting routes
module.exports = router;
