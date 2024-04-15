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
    <div className="w-full h-5/6 flex flex-col">
      <h2 className="font-bold text-neutral-600 text-left w-full">Narrative</h2>
      {narrativeGeneration ? (
        <div className="flex flex-grow items-center justify-center">
          <Loader />
        </div>
      ) : createdNarrative ? (
        <div className="overflow-auto flex flex-col flex-grow w-full mt-5">
          <p className="text-justify w-full">{createdNarrative}</p>
        </div>
      ) : (
        <div className="flex flex-grow items-center justify-center">
          <p className="text-center">No narrative generated</p>
        </div>
      )}
    </div>
  );
};

export default Result;
