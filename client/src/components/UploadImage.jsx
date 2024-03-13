import React, { useContext } from "react";
import { StateContext } from "../App";

const UploadImage = () => {
  const { setUploadedImage } = useContext(StateContext);

  const uploadImage = async (e) => {
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setUploadedImage(imageFile);
    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(
        "http://localhost:8000/images/upload",
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="upload-image">
      <p className="extra-info">
        Or,
        <span>
          <label htmlFor="files"> upload an image </label>
          <input
            onChange={uploadImage}
            id="files"
            accept="image/*"
            type="file"
            hidden
          />
        </span>
        to edit.
      </p>
    </div>
  );
};

export default UploadImage;
