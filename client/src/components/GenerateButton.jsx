import { useContext } from "react";
import "../index.css";
import { StateContext } from "../App";

const GenerateButton = () => {
  const handleGenerate = () => {
    console.log("POST REQUEST ALL THREE ENDPOINTS");
    setMode('render');
  };
  const {
    mode,
    setMode,
  } = useContext(StateContext);


  return (
    <div className="button-container flex justify-center">
      <button className="btn-pill" onClick={ handleGenerate }>
        { mode == "sketch" ? "Generate" : "Regenerate" }
      </button>
    </div>
  );
};

export default GenerateButton;
