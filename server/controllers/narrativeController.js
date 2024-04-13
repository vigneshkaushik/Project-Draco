import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI();

export const createNarrative = async (req, res) => {
  const {
    architecturalStyle,
    location,
    typology,
    programs,
    description,
    imageDescription,
  } = req.body;

  const messages = [
    {
      role: "system",
      content:
        "Create a structured narrative that includes detailed descriptions and headings for each section. Use the information provided to elaborate on the architectural style, location, typology, functionality, and aesthetic elements as outlined in the image description. Ensure the narrative is coherent, informative, and formatted with distinct sections as per the following requirements.",
    },
    {
      role: "user",
      content: `Architectural Style: The architectural style is characterized as ${architecturalStyle}.`,
    },
    {
      role: "user",
      content: `Location: The project is located in ${location}.`,
    },
    {
      role: "user",
      content: `Building Typology: The building's typology is designed as a ${typology}.`,
    },
    {
      role: "user",
      content: `Functional Programs: The building includes the following functional areas: ${programs}.`,
    },
    { role: "user", content: `Design Description: ${description}.` },
    { role: "user", content: `Visual Description: ${imageDescription}.` },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });

    // Finding the last message from the assistant to ensure we are sending the right content
    const lastAssistantMessage = completion.choices
      .filter((choice) => choice.message.role === "assistant")
      .pop();

    if (lastAssistantMessage) {
      res.json({ narrative: lastAssistantMessage.message.content });
    } else {
      res
        .status(404)
        .json({ message: "No narrative response found from the assistant." });
    }
  } catch (error) {
    console.error("Failed to generate narrative:", error);
    res.status(500).json({
      status: "Error with POST /narrative/create endpoint",
      message: error.message,
    });
  }
};
