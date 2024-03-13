import React, { useState } from "react";
import SearchSection from "./components/SearchSection";
import ImageSection from "./components/ImageSection";

export const StateContext = React.createContext();

const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [modelOpen, setModelOpen] = useState(false);

  const state = {
    images,
    setImages,
    value,
    setValue,
    error,
    setError,
    uploadedImage,
    setUploadedImage,
    modelOpen,
    setModelOpen,
  };

  return (
    <div className="app">
      <StateContext.Provider value={state}>
        <SearchSection />
        <ImageSection />
      </StateContext.Provider>
    </div>
  );
};

export default App;
