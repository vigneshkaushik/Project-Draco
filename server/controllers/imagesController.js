require("dotenv").config();
const OpenAI = require("openai");
const fs = require("fs");
const multer = require("multer");

const openai = new OpenAI(process.env.OpenAI_API_KEY);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploaded_images");
  },
  filename: (req, file, cb) => {
    console.log("file", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");
let filePath;

// Function to create image
const createImage = async (req, res) => {
  try {
    const image = await openai.images.generate({
      model: "dall-e-2",
      prompt: req.body.prompt,
      n: 3,
    });
    console.log(image.data);
    res.send(image.data);
  } catch (error) {
    console.error("POST/image/create:", error);
    res
      .status(400)
      .json({ status: "Error with createImage", message: error.message });
  }
};

//Function to upload image
const uploadImage = async (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    filePath = req.file.path;
  });
};

//Function to vary image to image
const varyImage = async (req, res) => {
  try {
    const image = await openai.images.createVariation({
      image: fs.createReadStream(filePath),
      n: 3,
    });
    console.log(image.data);
  } catch (error) {
    console.error("POST/image/vary:", error);
    res
      .status(400)
      .json({ status: "Error with varyImage", message: error.message });
  }
};

// Exporting the function
module.exports = { createImage, uploadImage, varyImage };
