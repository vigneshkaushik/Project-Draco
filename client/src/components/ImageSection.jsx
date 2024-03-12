import React from "react";

const ImageSection = ({ images, value }) => {
  return (
    <section className="image-section">
      {images?.map((image, index) => (
        <img key={index} src={image.url} alt={`Generated image of ${value}`} />
      ))}
    </section>
  );
};

export default ImageSection;
