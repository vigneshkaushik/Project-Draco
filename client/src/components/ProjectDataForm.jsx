import { useContext } from "react";
import { StateContext } from "../App";
import "../index.css";

const ProjectDataForm = () => {
  const { projectData, setProjectData } = useContext(StateContext);

  const handleProjectDataChange = (key, value) => {
    setProjectData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative w-full">
      <div className="w-full p-3 bg-neutral-200 rounded-lg shadow-md items-center text-center flex flex-col gap-5">
        <h2 className="font-bold text-neutral-600">1. PROJECT DATA</h2>
        <input
          className="w-full p-1 rounded-md"
          type="text"
          placeholder="Location"
          value={projectData.location}
          onChange={(e) => handleProjectDataChange("location", e.target.value)}
        />
        <input
          className="w-full px-2 rounded-md"
          type="number"
          placeholder="Size (sqm)"
          value={projectData.size}
          onChange={(e) => handleProjectDataChange("size", e.target.value)}
        />
        <input
          className="w-full px-2 rounded-md"
          type="text"
          placeholder="Typology"
          value={projectData.typology}
          onChange={(e) => handleProjectDataChange("typology", e.target.value)}
        />
        <input
          className="w-full px-2 rounded-md"
          type="text"
          placeholder="Programs"
          value={projectData.programs}
          onChange={(e) => handleProjectDataChange("programs", e.target.value)}
        />
        <textarea
          className="w-full px-2 rounded-md"
          placeholder="Brief Description"
          value={projectData.description}
          onChange={(e) =>
            handleProjectDataChange("description", e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default ProjectDataForm;
