import React from "react";
import "../index.css";

const GenerateButton = () => {
  const handleGenerate = () => {
    console.log("POST REQUEST ALL THREE ENDPOINTS");
  };

  return (
    <div className="button-container">
      <button className="btn-pill" onClick={handleGenerate}>
        Generate
      </button>
    </div>
  );
};

export default GenerateButton;
