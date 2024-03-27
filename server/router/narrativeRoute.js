const express = require("express");
const router = express.Router();

// Importing controller function
const { createNarrative } = require("../controllers/narrativeController");

// Creating route
router.post("/create", createNarrative);

// Exporting routes
module.exports = router;
