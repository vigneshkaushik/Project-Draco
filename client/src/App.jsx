import React, { useState } from "react";
import SearchSection from "./components/SearchSection";
import ImageSection from "./components/ImageSection";

const App = () => {
  const [images, setImages] = useState(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="app">
      <SearchSection
        setImages={setImages}
        setValue={setValue}
        value={value}
        setError={setError}
        error={error}
      />
      <ImageSection images={images} value={value} />
    </div>
  );
};

export default App;
