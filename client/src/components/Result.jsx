import { useContext } from "react";
import { StateContext } from "../App";

const Result = () => {
  const {
    createdNarrative, createdCritique
  } = useContext(StateContext);


  return (
    <div className="relative">
      <h3 className="font-bold text-neutral-600">Narrative</h3>
      { createdNarrative }
      <p>This is where the similarity score and generated narrative goes.</p>
      <h3 className="font-bold text-neutral-600">Similarity Score</h3>
      <p>{ createdCritique || "No similarity score available." }</p>
    </div>
  );
};

export default Result;
