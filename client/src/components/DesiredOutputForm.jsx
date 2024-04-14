import { useContext } from "react";
import { StateContext } from "../App";
import "../index.css";

const DesiredOutputForm = () => {
  const { desiredOutput, setDesiredOutput } = useContext(StateContext);

  const handleDesiredOutputChange = (key, value) => {
    setDesiredOutput((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative w-full">
      <div className="w-full p-3 bg-neutral-200 rounded-lg shadow-md items-center text-center flex flex-col gap-5">
        <h3 className="font-bold text-neutral-600">2. DESIRED OUTPUT</h3>
        <select
          className="w-full text-gray-400 px-2 rounded-md"
          value={desiredOutput.imageStyle}
          onChange={(e) =>
            handleDesiredOutputChange("imageStyle", e.target.value)
          }
        >
          <option value="">Select Image Style</option>
          <option value="3d-model">3D Model</option>
          <option value="analog-film">Analog Film</option>
          <option value="cinematic">Cinematic</option>
          <option value="digital-art">Digital Art</option>
          <option value="fantasy-art">Fantasy Art</option>
          <option value="neon-punk">Neon Punk</option>
          <option value="photographic">Photographic</option>
        </select>
        <select
          className="w-full  px-2 text-gray-400 rounded-md"
          value={desiredOutput.architecturalStyle}
          onChange={(e) =>
            handleDesiredOutputChange("architecturalStyle", e.target.value)
          }
        >
          <option value="">Select Architectural Style</option>
          <option value="contemporary">Contemporary</option>
          <option value="scandinavian">Scandinavian</option>
          <option value="minimalist">Minimalist</option>
          <option value="industrial">Industrial</option>
          <option value="futuristic">Futuristic</option>
        </select>
        <div className="radio-group w-full flex gap-3 text-neutral-600">
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
    </div>
  );
};

export default DesiredOutputForm;
