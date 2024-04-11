import express from "express";
import { createNarrative } from "../controllers/narrativeController.js";

const router = express.Router();

// Creating route
router.post("/create", createNarrative);

// Exporting routes
export default router;
