import { useContext, useState, useEffect } from "react";
import { StateContext } from "../App";
import Loader from "./Loader";

const FinalOutput = () => {
  const { createdImage, imageGeneration, setImageGeneration } =
    useContext(StateContext);
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    if (createdImage === "SUCCESS") {
      console.log("Image updated, updating timestamp.");
      setTimestamp(Date.now()); // Update the timestamp when a new image is created
      setImageGeneration(false); // Ensure generating is set to false when image creation succeeds
    }
  }, [createdImage, setImageGeneration]); // Include setImageGeneration in the dependency array

  const imageUrl = `http://localhost:8000/out/generatedImage_0.png?t=${timestamp}`;
  console.log("Requesting image from:", imageUrl);

  return (
    <div className="p-3 pb-10 basis-72 h-full flex justify-center items-center">
      <div>
        {imageGeneration ? (
          <Loader />
        ) : createdImage === "SUCCESS" ? (
          <img src={imageUrl} alt="Generated Output" />
        ) : (
          <p className="text-center">No image generated.</p> // Text centered within its own block
        )}
      </div>
    </div>
  );
};

export default FinalOutput;
