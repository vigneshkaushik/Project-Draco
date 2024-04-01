import React, { useContext } from "react";
import { StateContext } from "../App";
import "../index.css";

const Stepper = () => {
  const { currentStep, totalSteps } = useContext(StateContext);

  return (
    <div className="stepper">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`dot ${currentStep === index + 1 ? "active" : ""}`}
        ></div>
      ))}
    </div>
  );
};

export default Stepper;
