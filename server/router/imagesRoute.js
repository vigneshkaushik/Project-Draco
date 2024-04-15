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



const inputStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'inputs/'); // Save files to the "public/images" folder
  },
  filename: function (req, file, cb) {
    console.log('req', req.body);
    const uuid = req.body.uuid;
    const filename = uuid + '.jpeg';
    cb(null, filename); // Save file as "image.jpg"
  }
});

const uploadInput = multer({ storage: inputStorage });

router.post('/save-image', uploadInput.single('file'), (req, res) => {
  res.send('Image saved successfully');
});

export default router;
