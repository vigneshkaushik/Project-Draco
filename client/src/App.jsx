import { useState } from "react";
import SearchSection from "./components/SearchSection";
import ImageSection from "./components/ImageSection";

function App() {
  return (
    <div className="app">
      <SearchSection />
      <ImageSection />
    </div>
  );
}

export default App;
