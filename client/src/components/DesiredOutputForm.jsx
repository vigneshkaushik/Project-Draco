import React, { useContext } from "react";
import { StateContext } from "../App";
import "../index.css";

const DesiredOutputForm = () => {
  const { desiredOutput, setDesiredOutput, currentStep, setCurrentStep } =
    useContext(StateContext);

  const goToNextStep = () => {
    const isAllFieldsFilled =
      desiredOutput.imageStyle.trim() &&
      desiredOutput.architecturalStyle.trim() &&
      desiredOutput.interiorExterior.trim();

    if (!isAllFieldsFilled) {
      alert("Please fill in all fields before proceeding.");
      return; // Prevents moving to the next step
    }

    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleDesiredOutputChange = (key, value) => {
    setDesiredOutput((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h3>Desired Output</h3>
        <select
          value={desiredOutput.imageStyle}
          onChange={(e) =>
            handleDesiredOutputChange("imageStyle", e.target.value)
          }
        >
          <option value="">Select Image Style</option>
          <option value="lineart">Line Art</option>
          <option value="diagrammatic">Diagrammatic</option>
          <option value="watercolor">Watercolor</option>
          <option value="realistic">Realistic Render</option>
        </select>
        <select
          value={desiredOutput.architecturalStyle}
          onChange={(e) =>
            handleDesiredOutputChange("architecturalStyle", e.target.value)
          }
        >
          <option value="">Select Architectural Style</option>
          <option value="contemporary">Contemporary</option>
          <option value="scandinavian">Scandinavian</option>
          <option value="minimalist">Minimalist</option>
          <option value="industrial">Industrial</option>
          <option value="futuristic">Futuristic</option>
        </select>
        <div className="radio-group">
          <input
            type="radio"
            id="interior"
            name="interiorExterior"
            value="interior"
            checked={desiredOutput.interiorExterior === "interior"}
            onChange={(e) =>
              handleDesiredOutputChange("interiorExterior", e.target.value)
            }
          />
          <label htmlFor="interior">Interior</label>
          <input
            type="radio"
            id="exterior"
            name="interiorExterior"
            value="exterior"
            checked={desiredOutput.interiorExterior === "exterior"}
            onChange={(e) =>
              handleDesiredOutputChange("interiorExterior", e.target.value)
            }
          />
          <label htmlFor="exterior">Exterior</label>
        </div>
      </div>
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

export default DesiredOutputForm;
