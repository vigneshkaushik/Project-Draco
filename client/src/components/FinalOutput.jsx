import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StateContext } from "../App";
import Loader from "./Loader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8000";

const FinalOutput = () => {
  const { createdImage, imageGeneration, setImageGeneration } =
    useContext(StateContext);
  const [latestImageUrl, setLatestImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestImage = async () => {
      if (createdImage === "SUCCESS") {
        setLoading(true);
        console.log("Image updated, fetching latest generated image.");
        try {
          const response = await axios.get(
            `${SERVER_URL}/images/latest-file/out`
          );
          if (response.data && response.data.path) {
            setLatestImageUrl(response.data.path);
            console.log("Latest image URL fetched:", response.data.path);
          } else {
            throw new Error("Failed to fetch latest generated image URL");
          }
        } catch (error) {
          console.error("Error fetching latest generated image:", error);
        }
        setLoading(false);
        setImageGeneration(false); // Ensure generating is set to false when image creation succeeds
      }
    };

    fetchLatestImage();
  }, [createdImage, setImageGeneration]);

  return (
    <div className="p-3 pb-10 basis-72 h-full flex justify-center items-center">
      <div>
        {imageGeneration || loading ? (
          <Loader />
        ) : latestImageUrl ? (
          <img src={latestImageUrl} alt="Generated Output" />
        ) : (
          <p className="text-center">No image generated.</p>
        )}
      </div>
    </div>
  );
};

export default FinalOutput;
