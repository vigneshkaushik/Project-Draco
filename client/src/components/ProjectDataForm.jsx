import React, { useContext } from "react";
import { StateContext } from "../App";
import "../index.css";
import PDFUpload from "./PDFUpload";

const ProjectDataForm = () => {
  const { projectData, setProjectData, currentStep, setCurrentStep } =
    useContext(StateContext);

  const goToNextStep = () => {
    // Check if all fields in projectData are filled
    const isAllFieldsFilled =
      projectData.location.trim() &&
      projectData.size.toString().trim() &&
      projectData.typology.trim() &&
      projectData.programs.trim() &&
      projectData.description.trim();

    if (!isAllFieldsFilled) {
      alert("Please fill in all fields before proceeding.");
      return; // Prevents moving to the next step
    }

    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleProjectDataChange = (key, value) => {
    setProjectData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h3>Project Data</h3>
        <input
          type="text"
          placeholder="Location"
          value={projectData.location}
          onChange={(e) => handleProjectDataChange("location", e.target.value)}
        />
        <input
          type="number"
          placeholder="Size (sqm)"
          value={projectData.size}
          onChange={(e) => handleProjectDataChange("size", e.target.value)}
        />
        <input
          type="text"
          placeholder="Typology"
          value={projectData.typology}
          onChange={(e) => handleProjectDataChange("typology", e.target.value)}
        />
        <input
          type="text"
          placeholder="Programs"
          value={projectData.programs}
          onChange={(e) => handleProjectDataChange("programs", e.target.value)}
        />
        <textarea
          placeholder="Brief Description"
          value={projectData.description}
          onChange={(e) =>
            handleProjectDataChange("description", e.target.value)
          }
        />
        <div style={{ textAlign: "center", margin: "10px 0" }}>Or</div>
        <PDFUpload />
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

export default ProjectDataForm;
