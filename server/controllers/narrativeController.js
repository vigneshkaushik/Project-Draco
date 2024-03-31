require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI(process.env.OpenAI_API_KEY);

const createNarrative = async (req, res) => {
  const { narrativeData } = req.body;
  const { projectData, desiredOutput } = narrativeData;

  const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant designed to output JSON. Form an architectural narrative based on the following information and structure the response in JSON format.",
    },
    { role: "user", content: `Project data: ${projectData}.` },
    { role: "user", content: `Desired narrative output: ${desiredOutput}.` },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      response_format: { type: "json_object" },
    });
    const narrativeJson = response.data.choices[0].message.content.trim();

    // Since the output is JSON, parse it before sending it in the response
    const narrative = JSON.parse(narrativeJson);

    // Return the generated narrative JSON object
    res.json(narrative);
  } catch (error) {
    res.status(500).json({
      status: "Error with POST/narrative/create endpoint",
      message: error.message,
    });
  }
};

// Exporting the function
module.exports = { createNarrative };
