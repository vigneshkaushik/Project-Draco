import React, { useContext, useEffect } from "react";
import { StateContext } from "../App";

const ImageSection = () => {
  const { images, value } = useContext(StateContext);

  // useEffect hook to run when the images state changes
  useEffect(() => {
    // Your code to execute when the images state changes
    console.log("Images state has changed:", images);
  }, [images]); // Dependency array containing the images state

  return (
    <section className="image-section">
      {images?.map((image, index) => (
        <img key={index} src={image.url} alt={`Generated image of ${value}`} />
      ))}
    </section>
  );
};

export default ImageSection;
