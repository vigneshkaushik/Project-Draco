import dotenv from "dotenv";
import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment settings, or defaulting to local development settings
const BASE_URL = process.env.BASE_URL || "http://localhost:8000";

// Function to encode the image
const encodeImage = (imagePath) => {
  const imageData = fs.readFileSync(imagePath);
  return Buffer.from(imageData).toString("base64");
};

// Function to get the latest input image
export const getLatestInput = async (req, res) => {
  const inputsDirectory = path.join(__dirname, "..", "inputs");

  fs.readdir(inputsDirectory, async (err, files) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Failed to read directory", error: err.message });
      return;
    }

    if (files.length === 0) {
      res.status(404).send({ message: "No files found" });
      return;
    }

    try {
      // Sort files by creation time, newest first
      files.sort((a, b) => {
        const statA = fs
          .statSync(path.join(inputsDirectory, a))
          .mtime.getTime();
        const statB = fs
          .statSync(path.join(inputsDirectory, b))
          .mtime.getTime();
        return statB - statA;
      });

      // Create the full URL path
      const latestFileUrl = `${BASE_URL}/inputs/${files[0]}`;

      // Send the full URL of the newest file
      res.status(200).send({ path: latestFileUrl });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error processing files", error: error.message });
    }
  });
};

//Function to generate image
export const createImage = async (req, res) => {
  try {
    const {
      architecturalStyle,
      imageStyle,
      interiorExterior,
      location,
      size,
      typology,
      programs,
      description,
    } = req.body;

    const engineId = "stable-diffusion-v1-6";
    const apiHost = process.env.API_HOST || "https://api.stability.ai";
    const apiKey = process.env.STABILITY_API_KEY;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    if (!apiKey) {
      return res.status(500).json({ error: "Missing Stability API key." });
    }

    console.log(
      "Appending file:",
      req.file.path,
      req.file.originalname,
      req.file.mimetype
    );

    const formData = new FormData();

    // Read file content
    let fileContent;
    try {
      fileContent = fs.readFileSync(req.file.path);
      console.log("File read successfully");
    } catch (error) {
      console.error("Error reading file:", error);
      return res.status(500).json({ error: "Failed to read file." });
    }

    // Append file content to FormData
    formData.append("init_image", fileContent, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    console.log("File appended successfully");

    formData.append("init_image_mode", "IMAGE_STRENGTH");
    formData.append("image_strength", 0.4);

    formData.append("text_prompts[0][text]", `A ${typology} building`);
    formData.append("text_prompts[0][weight]", 1);

    const prompts = [
      { text: `The building is located in ${location}.`, weight: 0.5 },
      { text: `The building is approximately ${size} sqm.`, weight: 0.5 },
      {
        text: `The building includes the following functional areas:${programs}`,
        weight: 0.5,
      },
      {
        text: `The design can be described as follows: ${description}`,
        weight: 1.5,
      },
      {
        text: `The architectural style is characterized as ${architecturalStyle}`,
        weight: 1.5,
      },
      {
        text: `It is an ${interiorExterior} view of the building.`,
        weight: 0.5,
      },
      {
        text: "Beautiful, realistic, well-designed, neat, architecture render",
        weight: 2,
      },
      {
        text: "Dark outlines, sketch lines, bold lines, drawing, painting, unrealistic, blurry, bad, ugly, fake, messy, clutter, surreal, nonsense",
        weight: -1.5,
      },
    ];
    prompts.forEach((prompt, index) => {
      formData.append(`text_prompts[${index + 1}][text]`, prompt.text);
      formData.append(`text_prompts[${index + 1}][weight]`, prompt.weight);
    });

    formData.append("cfg_scale", 10);
    formData.append("samples", 1);
    formData.append("steps", 30);
    formData.append("style_preset", imageStyle);

    console.log("Sending request to API");
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/image-to-image`,
      {
        method: "POST",
        headers: {
          ...formData.getHeaders(),
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    );

    console.log("API response status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJSON = await response.json();

    responseJSON.artifacts.forEach((artifact, index) => {
      const outputPath = path.join("out", `generatedImage_${index}.png`);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, Buffer.from(artifact.base64, "base64"));
      console.log(`Artifact ${index} written to ${outputPath}`);
    });

    res.json(responseJSON);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "Error with POST/images/create endpoint",
      message: error.message,
    });
  }
};

// Function to process the generated image and create narrative
export const readImage = async (req, res) => {
  try {
    const { architecturalStyle, location, typology, programs, description } =
      req.body;

    // Path to the generated image
    const imageFileName = "generatedImage_0.png";
    const imagePath = path.join(__dirname, "..", "out", imageFileName);

    // Getting the base64 string of the generated image
    const base64Image = encodeImage(imagePath);

    // Send chat completion request to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Provide a description of the architecture in this image that can be used in a design proposal. 
              The architectural style is characterized as ${architecturalStyle}.
              The building is located in ${location}.
              The building's typology is designed as a ${typology}.
              The building includes the following functional areas: ${programs}.
              The design can be described as follows: ${description}.
              `,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    res.json(response.choices[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "Error with GET/images/read endpoint",
      message: error.message,
    });
  }
};
