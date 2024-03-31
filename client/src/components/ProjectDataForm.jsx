import React, { useContext } from "react";
import { StateContext } from "../App";

const ProjectDataForm = () => {
  const { projectData, setProjectData } = useContext(StateContext);

  const handleProjectDataChange = (key, value) => {
    setProjectData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
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
        onChange={(e) => handleProjectDataChange("description", e.target.value)}
      />
    </div>
  );
};

export default ProjectDataForm;
