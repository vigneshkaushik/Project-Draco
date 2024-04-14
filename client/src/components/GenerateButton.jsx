import { useContext, useState } from "react";
import "../index.css";
import { StateContext } from "../App";
import { useCreateImageNarrative } from "../hooks/useCreateImageNarrative";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import {
  exportToBlob,
  MIME_TYPES,
} from "@excalidraw/excalidraw";
const GenerateButton = () => {
  const { mode, setMode, excalidrawAPI, exportEmbedScene, exportWithDarkMode } = useContext(StateContext);
  const { generateImageNarrative, loading, error } =
    useCreateImageNarrative("/sketchimage.jpeg");

  // Use local state to track loading status
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    const uuid = uuidv4();
    await saveImage(uuid);
    setIsGenerating(true); // Set loading state to true before starting the operation
    await generateImageNarrative(); // Call the asynchronous function
    setIsGenerating(false); // Set loading state to false once the operation is complete
  };

  const saveImage = async (uuid) => {
    const blob = await exportToBlob({
      elements: excalidrawAPI?.getSceneElements(),
      mimeType: "image/jpeg",
      appState: {
        exportEmbedScene,
        exportWithDarkMode
      },
      files: excalidrawAPI?.getFiles()
    });

    // Create a FormData object and append the blob data to it
    const formData = new FormData();
    formData.append('uuid', uuid);
    formData.append('file', blob);

    try {
      // Send the FormData to your server-side endpoint
      const response = await axios.post('http://localhost:8000/images/save-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Optionally handle the response from the server
      console.log('Image saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };
  return (
    <div className="button-container flex justify-center">
      <button
        className="btn-pill"
        onClick={ handleGenerate }
        disabled={ isGenerating }
      >
        { mode == "sketch" ? "Generate" : "Regenerate" }
      </button>
      { error && <p className="text-red-500">Error: { error }</p> }
    </div>
  );
};

export default GenerateButton;
