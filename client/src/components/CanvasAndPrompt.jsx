import React, { useContext } from "react";
import { StateContext } from "../App";
import SketchCanvas from "./SketchCanvas";
import BasePromptInput from "./BasePromptInput";

const CanvasAndPrompt = () => {
  const { basePrompt, drawingData, currentStep, setCurrentStep } =
    useContext(StateContext);

  const goToNextStep = () => {
    // Check if basePrompt is empty after trimming and if drawingData is empty
    if (!basePrompt.trim() || drawingData.length === 0) {
      alert("Please sketch and enter a base prompt before proceeding.");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  return (
    <div className="form-wrapper">
      <SketchCanvas />
      <BasePromptInput />
      <div className="form-navigation">
        {currentStep > 1 && (
          <div className="previous-text" onClick={goToPreviousStep}>
            ← Previous
          </div>
        )}
        <div className="next-text" onClick={goToNextStep}>
          Next →
        </div>
      </div>
    </div>
  );
};

export default CanvasAndPrompt;
