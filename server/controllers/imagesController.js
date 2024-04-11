import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createImage = async (req, res) => {
  try {
    const {
      basePrompt,
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

    const formData = new FormData();

    console.log(
      "Appending file:",
      req.file.path,
      req.file.originalname,
      req.file.mimetype
    );

    const filePath = path.join(__dirname, "uploads", req.file.filename);
    console.log("File path:", filePath);
    console.log("File exists:", fs.existsSync(filePath));

    let fileContent;
    try {
      fileContent = fs.readFileSync(req.file.path);
      console.log("File read successfully");
    } catch (error) {
      console.error("Error reading file:", error);
      return res.status(500).json({ error: "Failed to read file." });
    }

    formData.append("init_image", fileContent, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    console.log("File appended successfully");

    formData.append("init_image_mode", "IMAGE_STRENGTH");
    formData.append("image_strength", 0.32);

    formData.append("text_prompts[0][text]", basePrompt);
    formData.append("text_prompts[0][weight]", 0.5);

    const prompts = [
      { text: `Background: ${location}`, weight: 1.5 },
      { text: `Size: ${size}`, weight: 0.5 },
      { text: `Typology: ${typology}`, weight: 0.5 },
      { text: `Programs: ${programs}`, weight: 0.5 },
      { text: `Description: ${description}`, weight: 1.5 },
      {
        text: `Architectural Style: ${architecturalStyle}`,
        weight: 1.5,
      },
      { text: `View: ${interiorExterior}`, weight: 0.5 },
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
      const outputPath = path.join("out", `v1_img2img_${index}.png`);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, Buffer.from(artifact.base64, "base64"));
      console.log(`Artifact ${index} written to ${outputPath}`);
    });

    res.json(responseJSON);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
};
