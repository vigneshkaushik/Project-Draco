import React, { useState } from "react";

import ProjectDataForm from "./components/ProjectDataForm";
import DesiredOutputForm from "./components/DesiredOutputForm";
import Canvas from "./components/Canvas";
import FinalOutput from "./components/FinalOutput";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Result from "./components/Result";
import GenerateButton from "./components/GenerateButton";
export const StateContext = React.createContext();

const App = () => {
  // ---SKETCH VS RENDER STATES---
  const [mode, setMode] = useState("sketch");
  const handleChangeMode = (event, currentMode) => {
    setMode(currentMode);
  };

  // --- INPUT STATES ---
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
  const [imageGeneration, setImageGeneration] = useState(false);
  const [narrativeGeneration, setNarrativeGeneration] = useState(false);

  // --- OUTPUT STATES ---
  const [createdImage, setCreatedImage] = useState(null);
  const [createdNarrative, setCreatedNarrative] = useState(null);

  // --- CANVAS ---
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [exportWithDarkMode, setExportWithDarkMode] = useState(false);
  const [exportEmbedScene, setExportEmbedScene] = useState(false);

  const state = {
    mode,
    setMode,
    projectData,
    setProjectData,
    desiredOutput,
    setDesiredOutput,
    createdImage,
    setCreatedImage,
    createdNarrative,
    setCreatedNarrative,
    imageGeneration,
    setImageGeneration,
    narrativeGeneration,
    setNarrativeGeneration,
    excalidrawAPI,
    setExcalidrawAPI,
    exportWithDarkMode,
    setExportWithDarkMode,
    exportEmbedScene,
    setExportEmbedScene,
  };
  return (
    <div className="h-screen w-screen relative p-0 m-0 bg-slate-50">
      <div className="w-full absolute top-0 z-10 h-auto flex justify-center py-2 bg-zinc-800">
        <ToggleButtonGroup
          className="h-8 bg-white border-1 border-white"
          value={mode}
          onChange={handleChangeMode}
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
        <StateContext.Provider value={state}>
          <div className="w-full h-full flex flex-row p-0 m-0 bg-zinc-100">
            <div className="flex flex-col gap-5 py-5 pb-10 px-5 basis-72 h-full w-full">
              {mode === "sketch" ? (
                <>
                  <ProjectDataForm />
                  <DesiredOutputForm />
                </>
              ) : mode === "render" ? (
                <Result />
              ) : null}
              <GenerateButton />
            </div>
            <div className="flex-grow bg-white">
              {mode == "sketch" && <Canvas />}
              {mode == "render" && <FinalOutput />}
            </div>
          </div>
        </StateContext.Provider>
      </div>
    </div>
  );
};

export default App;
