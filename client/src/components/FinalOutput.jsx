import { useContext } from "react";
import { StateContext } from "../App";
import "../index.css";

const FinalOutput = () => {
  const {
    createdImage,
  } = useContext(StateContext);


  return (
    <div className="p-3">
      <h2>Generated Output</h2>
      <div className="image-preview">
        { createdImage ? (
          <img src={ createdImage } alt="Generated Output" />
        ) : (
          <p>No image generated.</p>
        ) }
      </div>
    </div>

  );
};

export default FinalOutput;
