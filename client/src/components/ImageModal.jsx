import React, { useState, useContext, useRef, useEffect } from "react";
import { StateContext } from "../App";

const ImageModal = () => {
  const [error, setError] = useState(null);
  const { setModalOpen, setUploadedImage, uploadedImage, setImages, images } =
    useContext(StateContext);
  const ref = useRef(null);

  useEffect(() => {
    console.log(images);
  }, [images]); // Log the 'images' state whenever it changes

  const closeModal = () => {
    setModalOpen(false);
    setUploadedImage(null);
  };

  // const checkSize = () => {
  //   if (ref.currentWidth === 256 && ref.currentHeight === 256) {
  //     console.log("ok");
  //     //generateVariations()
  //   } else {
  //     setError("Error: Choose 256 x 256 image.");
  //   }
  // };

  const generateVariations = async () => {
    setImages(null);
    if (uploadedImage == null) {
      setError("Error! Must have an uploaded image.");
      setModalOpen(false);
      return;
    }
    try {
      const options = {
        method: "POST",
      };
      const response = await fetch(
        "http://localhost:8000/images/vary",
        options
      );
      const data = await response.json();
      // console.log(data);
      setImages(data);
      console.log(images);
      setError(null);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <div onClick={closeModal}>✖</div>
      <div className="img-container">
        {uploadedImage && (
          <img
            ref={ref}
            src={URL.createObjectURL(uploadedImage)}
            alt="uploaded image"
          />
        )}
      </div>
      {/* <p>{error || "* Image must be 256 x 256"}</p> */}
      {!error && <button onClick={generateVariations}>Generate</button>}
      {error && <button onClick={closeModal}>Close this and try again</button>}
    </div>
  );
};

export default ImageModal;
