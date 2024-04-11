import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createNarrative = async (req, res) => {
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
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: messages,
      // Ensure to use valid parameters here, adjust as necessary for the API call
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
