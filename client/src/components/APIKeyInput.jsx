import React, { useContext } from "react";
import { StateContext } from "../App";
import "../index.css";

const APIKeyInput = () => {
  const { apiKey, setApiKey, currentStep, setCurrentStep } =
    useContext(StateContext);

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const goToNextStep = () => {
    if (!apiKey.trim()) {
      alert("Please enter an API key before proceeding.");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h3>OpenAI API Key</h3>
        <input
          type="text"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter OpenAI API key"
        />
      </div>
      <div className="form-navigation">
        <div className="spacer" />
        <div className="next-text" onClick={goToNextStep}>
          Next →
        </div>
      </div>
    </div>
  );
};

export default APIKeyInput;
