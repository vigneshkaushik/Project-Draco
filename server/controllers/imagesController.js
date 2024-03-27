require("dotenv").config();
const OpenAI = require("openai");
// const fs = require("fs");
// const multer = require("multer");

const openai = new OpenAI(process.env.OpenAI_API_KEY);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploaded_images");
//   },
//   filename: (req, file, cb) => {
//     console.log("file", file);
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("file");

// let filePath;

// Function to create image
const createImage = async (req, res) => {
  const {
    basePrompt,
    imageStyle,
    architecturalStyle,
    projectData,
    additionalComments,
  } = req.body;

  // Start with the base prompt and append additional information
  let finalPrompt = basePrompt;

  if (imageStyle) {
    finalPrompt += ` Style: ${imageStyle}.`;
  }
  if (architecturalStyle) {
    finalPrompt += ` Architectural Style: ${architecturalStyle}.`;
  }
  if (projectData) {
    finalPrompt += ` Project Data: ${projectData}.`;
  }
  if (additionalComments) {
    finalPrompt += ` Additional Comments: ${additionalComments}.`;
  }

  try {
    const response = await openai.createImage({
      model: "dall-e-3",
      prompt: finalPrompt,
      n: 1,
      size: "1024 x 1024",
    });
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    res.status(500).json({
      status: "Error with POST/image/create endpoint",
      message: error.message,
    });
  }
};

// //Function to upload image
// const uploadImage = async (req, res) => {
//   upload(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     filePath = req.file.path;
//   });
// };

// //Function to vary image to image
// const varyImage = async (req, res) => {
//   try {
//     const image = await openai.images.createVariation({
//       image: fs.createReadStream(filePath),
//       n: 3,
//     });
//     console.log(image.data);
//   } catch (error) {
//     console.error("POST/image/vary:", error);
//     res
//       .status(400)
//       .json({ status: "Error with varyImage", message: error.message });
//   }
// };

// Exporting the functions
module.exports = { createImage };
