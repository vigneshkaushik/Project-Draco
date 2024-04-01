import React, { useContext } from "react";
import { StateContext } from "../App";
import "../index.css";

const BasePromptInput = () => {
  const { basePrompt, setBasePrompt } = useContext(StateContext);

  const handleBasePromptChange = (e) => {
    setBasePrompt(e.target.value);
  };

  return (
    <div className="form-container">
      <h3>Base Prompt</h3>
      <input
        type="text"
        id="basePrompt"
        value={basePrompt}
        onChange={handleBasePromptChange}
        placeholder="Enter base prompt"
      />
    </div>
  );
};

export default BasePromptInput;
