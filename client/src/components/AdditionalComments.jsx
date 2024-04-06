import React, { useContext } from "react";
import { StateContext } from "../App";

const AdditionalComments = () => {
  const {
    additionalComments,
    setAdditionalComments,
    currentStep,
    setCurrentStep,
  } = useContext(StateContext);

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAdditionalCommentsChange = (e) => {
    setAdditionalComments(e.target.value);
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h3>Additional Comments (Optional)</h3>
        <textarea
          placeholder="Add any additional comments here"
          value={additionalComments}
          onChange={handleAdditionalCommentsChange}
        />
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

export default AdditionalComments;
