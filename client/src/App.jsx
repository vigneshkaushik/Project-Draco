import React, { useState } from "react";
import ProjectDataForm from "./components/ProjectDataForm";
import PDFUpload from "./components/PDFUpload";

export const StateContext = React.createContext();

const App = () => {
  const [projectData, setProjectData] = useState({
    location: "",
    size: "",
    typology: "",
    programs: "",
    description: "",
  });

  const state = { projectData, setProjectData };

  return (
    <div className="app">
      <StateContext.Provider value={state}>
        <ProjectDataForm />
        <PDFUpload />
      </StateContext.Provider>
    </div>
  );
};

export default App;
