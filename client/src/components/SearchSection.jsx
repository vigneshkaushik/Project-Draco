import React, { useContext } from "react";
import { StateContext } from "../App";
import UploadImage from "./UploadImage";

const SearchSection = () => {
  const { setImages, setValue, value, setError, error } =
    useContext(StateContext);

  const surpriseOptions = [
    "A cutting-edge office tower with a facade featuring dynamic LED lighting and sustainable materials.",
    "A sleek, minimalist apartment building with floor-to-ceiling windows and terraces on each floor.",
    "A high-tech research facility designed with modular, adaptable spaces to foster collaboration and innovation.",
    "An avant-garde art museum characterized by its striking angular forms and interactive digital exhibits.",
    "A mixed-use development incorporating green spaces, rooftop gardens, and smart building technologies.",
    "A state-of-the-art sports arena featuring a retractable roof and immersive multimedia experiences for fans.",
    "An innovative coworking space designed for flexibility, with movable walls and integrated technology solutions.",
    "A contemporary beachfront resort blending organic materials, such as wood and stone, with modernist design elements.",
    "A sustainable urban housing project featuring passive solar design and communal green spaces.",
  ];

  const handleSurprise = () => {
    setImages(null);
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getImages = async () => {
    setImages(null);
    if (value === null) {
      setError("Error! Must have a search term.");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          prompt: value,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:8000/images/create",
        options
      );
      const data = await response.json();
      console.log(data);
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <section className="search-section">
      <p>
        Start with a detailed description
        <span className="surprise" onClick={handleSurprise}>
          Surprise me
        </span>
      </p>
      <div className="input-container">
        <input
          placeholder="A sleek, energy-efficient skyscraper with a double-skin facade and integrated wind turbines for renewable energy generation."
          value={value}
          onChange={handleChange}
        />
        <button onClick={getImages}>Generate</button>
      </div>
      <UploadImage />
      {error && <p>{error}</p>}
    </section>
  );
};

export default SearchSection;
