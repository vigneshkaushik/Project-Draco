require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI(process.env.OpenAI_API_KEY);

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

// Exporting the functions
module.exports = { createImage };
