import { useContext, useState } from "react";
import { StateContext } from "../App";

export const useCreateCritique = () => {
  const { setCreatedCritique } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCritique = async (critiqueData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/critique/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(critiqueData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCreatedCritique(data); // Update the global state with the new critique data
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { createCritique, isLoading, error };
};
