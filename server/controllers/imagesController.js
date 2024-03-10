require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI(process.env.OpenAI_API_KEY);

// Function to create image
const createImage = async (req, res) => {
  try {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: "A cute baby sea otter",
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

// Exporting the function
module.exports = { createImage };
