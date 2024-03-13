import React, { useContext } from "react";
import { StateContext } from "../App";

const ImageSection = () => {
  const { images, value } = useContext(StateContext);

  return (
    <section className="image-section">
      {images?.map((image, index) => (
        <img key={index} src={image.url} alt={`Generated image of ${value}`} />
      ))}
    </section>
  );
};

export default ImageSection;
