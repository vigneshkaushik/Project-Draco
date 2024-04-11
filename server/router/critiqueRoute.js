import express from "express";
const router = express.Router();

// Importing controller function
import { createCritique } from "../controllers/critiqueController.js";

// Creating route
router.post("/create", createCritique);

// Exporting routes
export default router;
