import React, { useState } from "react";
// import Stepper from "./components/Stepper";
// import APIKeyInput from "./components/APIKeyInput";
import ProjectDataForm from "./components/ProjectDataForm";
import DesiredOutputForm from "./components/DesiredOutputForm";
import AdditionalComments from "./components/AdditionalComments";
import Canvas from "./components/Canvas";
import FinalOutput from "./components/FinalOutput";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Result from "./components/Result";
import GenerateButton from "./components/GenerateButton";
export const StateContext = React.createContext();

const App = () => {
  // ---SKETCH VS RENDER STATES---
  const [mode, setMode] = useState('sketch');
  const handleChangeMode = (event, currentMode) => {
    setMode(currentMode);
  };
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
    mode,
    setMode,
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
  return (
    <div className="h-screen w-screen relative p-0 m-0 bg-slate-50">
      <div className="w-full absolute top-0 z-10 h-auto flex justify-center py-2 bg-zinc-800" >
        <ToggleButtonGroup
          className="h-8 bg-white border-1 border-white"
          value={ mode }
          onChange={ handleChangeMode }
          exclusive
          aria-label="mode"
        >
          <ToggleButton value="sketch" aria-label="sketch" color="primary">
            <p className="font-bold">Sketch</p>
          </ToggleButton>
          <ToggleButton value="render" aria-label="render" color="primary">
            <p className="font-bold">Render</p>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="p-0 mx-0 w-full h-full pt-12">
        <StateContext.Provider value={ state }>
          <div className="w-full h-full flex flex-row p-0 m-0 bg-zinc-100">
            { mode == "sketch" && <div className="flex flex-col gap-5 pt-5 px-5 basis-72">
              <ProjectDataForm />
              <DesiredOutputForm />
              <AdditionalComments />
              <GenerateButton />
              {/* <button className="w-full bg-blue-200 p-2 rounded-md shadow-md hover:bg-blue-100" onClick={ handleGenerate }>Generate</button> */ }
            </div> }
            { mode == "render" && <div className=" flex flex-col gap-5 pt-5 px-5 basis-72">
              <Result />
              <GenerateButton />
            </div> }
            <div className="flex-grow bg-white">
              { mode == "sketch" && <Canvas /> }
              { mode == "render" && <FinalOutput /> }
            </div>
          </div>
        </StateContext.Provider>
      </div>
    </div>

  );
};

export default App;
