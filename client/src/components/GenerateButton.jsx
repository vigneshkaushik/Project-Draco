import React, { useContext } from "react";
import { StateContext } from "../App";

const GenerateButton = () => {
  const { setCommentsVisible } = useContext(StateContext);

  const handleGenerate = () => {
    setCommentsVisible(true);
  };

  return <button onClick={handleGenerate}>Generate</button>;
};

export default GenerateButton;
