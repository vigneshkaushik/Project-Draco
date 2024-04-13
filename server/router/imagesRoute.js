// imagesRoute.js
import express from "express";
import multer from "multer";
import { createImage, readImage } from "../controllers/imagesController.js";
import path from "path";

const router = express.Router();

// Set up storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // set the destination
  },
  filename: (req, file, cb) => {
    // Create a unique filename with the original file's extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname); // Extract extension from original file
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("init_image"), createImage);
router.get("/read", readImage);

export default router;
