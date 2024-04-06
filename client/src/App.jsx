import React, { useState } from "react";
import Stepper from "./components/Stepper";
import APIKeyInput from "./components/APIKeyInput";
import CanvasAndPrompt from "./components/CanvasAndPrompt";
import ProjectDataForm from "./components/ProjectDataForm";
import DesiredOutputForm from "./components/DesiredOutputForm";
import AdditionalComments from "./components/AdditionalComments";
import Canvas from "./components/Canvas";
import FinalOutput from "./components/FinalOutput";

export const StateContext = React.createContext();

const App = () => {
  // --- STEPPER STATES ---
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // --- INPUT STATES ---
  const [drawingData, setDrawingData] = useState([]);
  const [basePrompt, setBasePrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [projectData, setProjectData] = useState({
    location: "",
    size: "",
    typology: "",
    programs: "",
    description: "",
  });
  const [desiredOutput, setDesiredOutput] = useState({
    imageStyle: "",
    architecturalStyle: "",
    interiorExterior: "",
  });
  const [additionalComments, setAdditionalComments] = useState("");

  // --- OUTPUT STATES ---
  const [createdImage, setCreatedImage] = useState(null);
  const [createdNarrative, setCreatedNarrative] = useState(null);
  const [createdCritique, setCreatedCritique] = useState(null);

  const state = {
    currentStep,
    setCurrentStep,
    totalSteps,
    drawingData,
    setDrawingData,
    basePrompt,
    setBasePrompt,
    apiKey,
    setApiKey,
    projectData,
    setProjectData,
    desiredOutput,
    setDesiredOutput,
    additionalComments,
    setAdditionalComments,
    createdImage,
    setCreatedImage,
    createdNarrative,
    setCreatedNarrative,
    createdCritique,
    setCreatedCritique,
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <APIKeyInput />;
      case 2:
        return <CanvasAndPrompt />;
      case 3:
        return <ProjectDataForm />;
      case 4:
        return <DesiredOutputForm />;
      case 5:
        return <AdditionalComments />;
      case 6:
        return <FinalOutput />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <StateContext.Provider value={ state }>
        <Stepper />
        { renderStepComponent() }
      </StateContext.Provider>
    </div>
  );
};

export default App;
