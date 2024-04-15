import { useContext, useState } from "react";
import "../index.css";
import { StateContext } from "../App";
import { useCreateImageNarrative } from "../hooks/useCreateImageNarrative";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { exportToBlob, MIME_TYPES } from "@excalidraw/excalidraw";
const GenerateButton = () => {
  const {
    mode,
    setCreatedImage,
    setCreatedNarrative,
    imageGeneration,
    narrativeGeneration,
    excalidrawAPI,
    exportEmbedScene,
    exportWithDarkMode,
  } = useContext(StateContext);
  const { generateImageNarrative, loading, error } =
    useCreateImageNarrative("/sketchimage.jpeg");

  const handleGenerate = async () => {
    const uuid = uuidv4();
    await saveImage(uuid);
    // Set image and narrative states to null before generating new ones
    setCreatedImage(null);
    setCreatedNarrative(null);
    // Then, proceed to generate the new image and narrative
    await generateImageNarrative();
  };

  const saveImage = async (uuid) => {
    const blob = await exportToBlob({
      elements: excalidrawAPI?.getSceneElements(),
      mimeType: "image/jpeg",
      appState: {
        exportEmbedScene,
        exportWithDarkMode,
      },
      files: excalidrawAPI?.getFiles(),
    });

    // Create a FormData object and append the blob data to it
    const formData = new FormData();
    formData.append("uuid", uuid);
    formData.append("file", blob);

    try {
      // Send the FormData to your server-side endpoint
      const response = await axios.post(
        "http://localhost:8000/images/save-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Optionally handle the response from the server
      console.log("Image saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };
  return (
    <div className="mt-auto self-center">
      <button
        className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-base font-medium transition-colors duration-300 ease-in-out hover:bg-blue-700 focus:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:text-white"
        onClick={handleGenerate}
        disabled={imageGeneration || narrativeGeneration}
      >
        {mode === "sketch" ? "Generate" : "Regenerate"}
      </button>
      {error && (
        <div className="text-red-500 mt-2 text-center">Error: {error}</div>
      )}
    </div>
  );
};

export default GenerateButton;
