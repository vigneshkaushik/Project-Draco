require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI(process.env.OpenAI_API_KEY);

// Function for image critique and similarity score
const createCritique = async (req, res) => {
  const { imageUrl, projectData, desiredOutput, additionalComments } = req.body;

  // Set up the messages array with an image URL and textual information
  const messages = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `Project Data: ${projectData}.  Desired Output: ${desiredOutput}. Additional Comments: ${additionalComments}.`,
        },

        {
          type: "image_url",
          image_url: {
            url: imageUrl,
            detail: "auto",
          },
        },
        {
          type: "text",
          text: "How similar is the content of this image to the provided project data, desired output, and additional comments? Output a similarity score from 0 to 100, where 0 is completely different and 100 is identical.",
        },
      ],
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: messages,
    });
    const similarityScore = response.data.choices[0].message.content.trim();

    // Return the similarity score
    res.json({ similarityScore });
  } catch (error) {
    res.status(500).json({
      status: "Error with POST/critique/create endpoint",
      message: error.message,
    });
  }
};

// Exporting the functions
module.exports = { createCritique };
