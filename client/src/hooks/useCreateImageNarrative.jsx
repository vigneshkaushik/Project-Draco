import { useContext, useState } from "react";
import { StateContext } from "../App";
import axios from "axios";
import FormData from "form-data";

export const useCreateImageNarrative = (imagePath) => {
  const {
    projectData, // Includes location, size, typology, programs, description
    desiredOutput, // Includes imageStyle, architecturalStyle, interiorExterior
    setCreatedImage,
    setCreatedNarrative,
    setMode,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImageNarrative = async () => {
    if (!imagePath) {
      setError("No image path provided");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Fetch the image from the URL as a stream
      const response = await axios.get(imagePath, { responseType: "blob" });
      // Convert stream data to Blob
      const blob = new Blob([response.data]);

      // Create a new FormData object
      const formData = new FormData();

      // Append the image file to the FormData object
      formData.append("init_image", blob, "sketchimage.jpeg");
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

      // Handle response
      if (createResponse.status === 200) {
        // Store the created image info
        setCreatedImage(true);
        console.log(
          "Image successfully created, attempting to read narrative..."
        );
        setMode("render");

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
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { generateImageNarrative, loading, error };
};
