import { useContext, useState } from "react";
import { StateContext } from "../App";

export const useCreateImage = () => {
  const { setCreatedImage } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createImage = async (imageData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/images/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imageData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCreatedImage(data); // Update the global state with the new image data
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { createImage, isLoading, error };
};
