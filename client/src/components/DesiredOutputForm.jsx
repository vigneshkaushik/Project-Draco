import React, { useContext } from "react";
import { StateContext } from "../App";

const DesiredOutputForm = () => {
  const { desiredOutput, setDesiredOutput } = useContext(StateContext);

  const handleDesiredOutputChange = (key, value) => {
    setDesiredOutput((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <h3>Desired Output</h3>
      <select
        value={desiredOutput.imageStyle}
        onChange={(e) =>
          handleDesiredOutputChange("imageStyle", e.target.value)
        }
      >
        <option value="">Select Image Style</option>
        <option value="lineart">Line Art</option>
        <option value="diagrammatic">Diagrammatic</option>
        <option value="watercolor">Watercolor</option>
        <option value="realistic">Realistic Render</option>
      </select>
      <select
        value={desiredOutput.architecturalStyle}
        onChange={(e) =>
          handleDesiredOutputChange("architecturalStyle", e.target.value)
        }
      >
        <option value="">Select Architectural Style</option>
        <option value="contemporary">Contemporary</option>
        <option value="scandinavian">Scandinavian</option>
      </select>
      <div>
        <input
          type="radio"
          id="interior"
          name="interiorExterior"
          value="interior"
          checked={desiredOutput.interiorExterior === "interior"}
          onChange={(e) =>
            handleDesiredOutputChange("interiorExterior", e.target.value)
          }
        />
        <label htmlFor="interior">Interior</label>
        <input
          type="radio"
          id="exterior"
          name="interiorExterior"
          value="exterior"
          checked={desiredOutput.interiorExterior === "exterior"}
          onChange={(e) =>
            handleDesiredOutputChange("interiorExterior", e.target.value)
          }
        />
        <label htmlFor="exterior">Exterior</label>
      </div>
    </div>
  );
};

export default DesiredOutputForm;
