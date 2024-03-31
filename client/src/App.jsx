import React, { useState } from "react";
import ProjectDataForm from "./components/ProjectDataForm";
import PDFUpload from "./components/PDFUpload";
import DesiredOutputForm from "./components/DesiredOutputForm";
import GenerateButton from "./components/GenerateButton";
import AdditionalComments from "./components/AdditionalComments";

export const StateContext = React.createContext();

const App = () => {
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
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [additionalComments, setAdditionalComments] = useState("");

  const [createdImage, setCreatedImage] = useState({});
  const [createdNarrative, setCreatedNarrative] = useState({});
  const [createdCritique, setCreatedCritique] = useState({});

  const state = {
    projectData,
    setProjectData,
    desiredOutput,
    setDesiredOutput,
    commentsVisible,
    setCommentsVisible,
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
    <div className="app">
      <StateContext.Provider value={state}>
        <ProjectDataForm />
        <PDFUpload />
        <DesiredOutputForm />
        <GenerateButton />
        <AdditionalComments />
      </StateContext.Provider>
    </div>
  );
};

export default App;
