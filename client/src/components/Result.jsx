import { useContext, useEffect } from "react";
import { StateContext } from "../App";
import Loader from "./Loader";

const Result = () => {
  const { createdNarrative, narrativeGeneration, setNarrativeGeneration } =
    useContext(StateContext);

  useEffect(() => {
    if (createdNarrative) {
      setNarrativeGeneration(false);
    }
  }, [createdNarrative]);

  return (
    <div className="w-full h-5/6">
      <h2 className="font-bold text-neutral-600">Narrative</h2>
      {narrativeGeneration ? (
        <Loader />
      ) : (
        <div className="overflow-auto w-full h-full mt-5">
          <p className="text-justify">
            {createdNarrative || "No narrative generated"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Result;
