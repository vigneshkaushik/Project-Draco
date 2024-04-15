// imagesRoute.js
import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  createImage,
  readImage,
  getLatestInput,
} from "../controllers/imagesController.js";

const router = express.Router();

const inputStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "inputs/");
  },
  filename: function (req, file, cb) {
    const uuid = uuidv4(); // Generate a UUID for each uploaded file
    const timestamp = new Date().getTime(); // Unix timestamp as a simple index
    const filename = `${timestamp}-${uuid}.jpeg`;
    cb(null, filename);
  },
});

const uploadInput = multer({ storage: inputStorage });

router.get("/latest-input", getLatestInput);
router.post("/save-image", uploadInput.single("file"), (req, res) => {
  res.send("Image saved successfully");
});
router.post("/create", uploadInput.single("init_image"), createImage);
router.get("/read", readImage);

export default router;
