import { useContext, useState } from "react";
import { StateContext } from "../App";
import axios from "axios";
import FormData from "form-data";

export const useCreateImageNarrative = () => {
  const {
    projectData,
    desiredOutput,
    setMode,
    setCreatedImage,
    setCreatedNarrative,
    setImageGeneration,
    setNarrativeGeneration,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const SERVER_URL =
    process.env.REACT_APP_SERVER_URL || "http://localhost:8000";

  const generateImageNarrative = async () => {
    setLoading(true);
    setImageGeneration(true);
    setNarrativeGeneration(true);

    try {
      const pathResponse = await axios.get(
        `${SERVER_URL}/images/latest-file/inputs`
      );

      if (!pathResponse.data || !pathResponse.data.path) {
        throw new Error("Failed to fetch the latest input image path");
      }
      const imageUrl = pathResponse.data.path;
      console.log("Latest input image path:", imageUrl);

      setMode("render");
      const imageResponse = await axios.get(imageUrl, { responseType: "blob" });
      const formData = new FormData();
      formData.append(
        "init_image",
        imageResponse.data,
        imageUrl.split("/").pop()
      );
      formData.append("architecturalStyle", desiredOutput.architecturalStyle);
      formData.append("imageStyle", desiredOutput.imageStyle);
      formData.append("interiorExterior", desiredOutput.interiorExterior);
      formData.append("location", projectData.location);
      formData.append("size", projectData.size);
      formData.append("typology", projectData.typology);
      formData.append("programs", projectData.programs);
      formData.append("description", projectData.description);

      const createResponse = await axios.post(
        `${SERVER_URL}/images/create`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (createResponse.status === 200 && createResponse.data.artifacts) {
        const successFailure = createResponse.data.artifacts[0].finishReason;
        setCreatedImage(successFailure);
        console.log(
          "Image successfully created, attempting to create narrative..."
        );
        const readResponse = await axios.get(`${SERVER_URL}/images/read`);

        if (
          readResponse.status === 200 &&
          readResponse.data &&
          readResponse.data.message &&
          readResponse.data.message.content
        ) {
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
      console.error("Error in generating image and narrative:", err);
      setError(err.message);
      setMode("sketch");
      setImageGeneration(false);
      setNarrativeGeneration(false);
    } finally {
      setLoading(false);
    }
  };

  return { generateImageNarrative, loading, error };
};
