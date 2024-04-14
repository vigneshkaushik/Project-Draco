import { useContext, useState } from "react";
import "../index.css";
import { StateContext } from "../App";
import { useCreateImageNarrative } from "../hooks/useCreateImageNarrative";

const GenerateButton = () => {
  const { mode, setMode } = useContext(StateContext);
  const { generateImageNarrative, loading, error } =
    useCreateImageNarrative("/sketchimage.jpeg");

  // Use local state to track loading status
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true); // Set loading state to true before starting the operation
    await generateImageNarrative(); // Call the asynchronous function
    setIsGenerating(false); // Set loading state to false once the operation is complete
  };

  return (
    <div className="button-container flex justify-center">
      <button
        className="btn-pill"
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {mode == "sketch" ? "Generate" : "Regenerate"}
      </button>
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
};

export default GenerateButton;
