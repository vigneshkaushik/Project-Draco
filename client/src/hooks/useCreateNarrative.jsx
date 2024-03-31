import { useContext, useState } from "react";
import { StateContext } from "../App";

export const useCreateNarrative = () => {
  const { setCreatedNarrative } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNarrative = async (narrativeData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/narrative/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(narrativeData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCreatedNarrative(data); // Update the global state with the new narrative data
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { createNarrative, isLoading, error };
};
