import { useContext, useState } from "react";
import { StateContext } from "../App";
import axios from "axios";
import FormData from "form-data";

export const useCreateImageNarrative = (imagePath) => {
  const {
    projectData, // Includes location, size, typology, programs, description
    desiredOutput, // Includes imageStyle, architecturalStyle, interiorExterior
    setMode,
    setCreatedImage,
    setCreatedNarrative,
    setImageGeneration,
    setNarrativeGeneration,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImageNarrative = async () => {
    if (!imagePath) {
      setError("No image path provided");
      setLoading(false);
      return;
    }

    try {
      setMode("render");
      setLoading(true);
      setImageGeneration(true);
      setNarrativeGeneration(true);
      // Fetch the image from the URL as a blob
      const response = await axios.get(imagePath, { responseType: "blob" });

      // Create a new FormData object
      const formData = new FormData();

      // Append the image file to the FormData object
      formData.append("init_image", response.data, "sketchimage.jpeg");
      formData.append("architecturalStyle", desiredOutput.architecturalStyle);
      formData.append("imageStyle", desiredOutput.imageStyle);
      formData.append("interiorExterior", desiredOutput.interiorExterior);
      formData.append("location", projectData.location);
      formData.append("size", projectData.size);
      formData.append("typology", projectData.typology);
      formData.append("programs", projectData.programs);
      formData.append("description", projectData.description);

      // Perform the API call to create the image
      const createResponse = await axios.post(
        "http://localhost:8000/images/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Check the createResponse and handle it
      if (createResponse.status === 200 && createResponse.data.artifacts) {
        const successFailure = createResponse.data.artifacts[0].finishReason;
        setCreatedImage(successFailure);
        console.log(successFailure);
        console.log(
          "Image successfully created, attempting to create narrative..."
        );

        // Second API call to read the image if creation was successful
        const readResponse = await axios.get(
          "http://localhost:8000/images/read"
        );

        // Handle response
        if (
          readResponse.status === 200 &&
          readResponse.data &&
          readResponse.data.message &&
          readResponse.data.message.content
        ) {
          // Extract and store the narrative
          setCreatedNarrative(readResponse.data.message.content);
          console.log(
            `Narrative created: ${readResponse.data.message.content}`
          );
        } else {
          throw new Error("Failed to read image or invalid response structure");
        }
      } else {
        throw new Error("Failed to create image");
      }
    } catch (err) {
      // Error handling
      console.error("Error in generating image:", err);
      setError(err.message);
      setMode("sketch"); // Set mode to "sketch" if error occurs
      setImageGeneration(false);
      setNarrativeGeneration(false);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { generateImageNarrative, loading, error };
};
