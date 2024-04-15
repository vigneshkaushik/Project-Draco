import { useContext, useState } from "react";
import "../index.css";
import { StateContext } from "../App";
import { useCreateImageNarrative } from "../hooks/useCreateImageNarrative";

const GenerateButton = () => {
  const {
    mode,
    setCreatedImage,
    setCreatedNarrative,
    imageGeneration,
    narrativeGeneration,
  } = useContext(StateContext);
  const { generateImageNarrative, loading, error } =
    useCreateImageNarrative("/sketchimage.jpeg");

  const handleGenerate = async () => {
    // Set image and narrative states to null before generating new ones
    setCreatedImage(null);
    setCreatedNarrative(null);
    // Then, proceed to generate the new image and narrative
    await generateImageNarrative();
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
