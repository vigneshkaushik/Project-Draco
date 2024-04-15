import { useContext, useState } from "react";
import "../index.css";
import { StateContext } from "../App";
import { useCreateImageNarrative } from "../hooks/useCreateImageNarrative";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { exportToBlob, MIME_TYPES } from "@excalidraw/excalidraw";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8000";

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
  const { generateImageNarrative, error } = useCreateImageNarrative();

  const handleGenerate = async () => {
    // Set image and narrative states to null before generating new ones
    setCreatedImage(null);
    setCreatedNarrative(null);
    await saveImage();
    await generateImageNarrative();
  };

  const saveImage = async () => {
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
    formData.append("file", blob);

    try {
      // Send the FormData to your server-side endpoint
      const response = await axios.post(
        `${SERVER_URL}/images/save-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-end w-full mt-auto">
      <button
        className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-base font-medium transition-colors duration-300 ease-in-out hover:bg-blue-700 focus:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:text-white"
        onClick={handleGenerate}
        disabled={imageGeneration || narrativeGeneration}
      >
        {mode === "sketch" ? "Generate" : "Regenerate"}
      </button>
      {error && (
        <div className="text-red-500 mt-2 text-center text-sm">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default GenerateButton;
