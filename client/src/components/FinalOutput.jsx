import React, { useContext } from "react";
import GenerateButton from "./GenerateButton";
import { StateContext } from "../App";
import "../index.css";

const FinalOutput = () => {
  const {
    createdImage,
    createdNarrative,
    createdCritique,
    currentStep,
    setCurrentStep,
  } = useContext(StateContext);

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const restart = () => {
    console.log("restart");
  };

  return (
    <div className="form-wrapper">
      <GenerateButton />
      <div className="output-section">
        <h2>Generated Output</h2>
        <div className="image-preview">
          {createdImage ? (
            <img src={createdImage} alt="Generated Output" />
          ) : (
            <p>No image generated.</p>
          )}
        </div>

        <div className="narrative-section">
          <h3>Narrative:</h3>
          <p>{createdNarrative || "No narrative available."}</p>
        </div>

        <div className="similarity-score-section">
          <h3>Similarity Score:</h3>
          <p>{createdCritique || "No similarity score available."}</p>
        </div>
      </div>
      <div className="form-navigation">
        {currentStep > 1 && (
          <div className="previous-text" onClick={goToPreviousStep}>
            ← Previous
          </div>
        )}
        <div className="next-text" onClick={restart}>
          Restart
        </div>
      </div>
    </div>
  );
};

export default FinalOutput;
