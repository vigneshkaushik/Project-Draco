const express = require("express");
const router = express.Router();

// Importing controller function
const { createCritique } = require("../controllers/critiqueController");

// Creating route
router.post("/create", createCritique);

// Exporting routes
module.exports = router;
