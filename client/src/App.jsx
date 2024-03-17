import React, { useState } from "react";
import SearchSection from "./components/SearchSection";
import ImageSection from "./components/ImageSection";
import ImageModal from "./components/ImageModal";

export const StateContext = React.createContext();

const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const state = {
    images,
    setImages,
    value,
    setValue,
    error,
    setError,
    uploadedImage,
    setUploadedImage,
    modalOpen,
    setModalOpen,
  };

  return (
    <div className="app">
      <StateContext.Provider value={state}>
        <SearchSection />
        <ImageSection />
        {modalOpen && (
          <div className="overlay">
            <ImageModal />
          </div>
        )}
      </StateContext.Provider>
    </div>
  );
};

export default App;
