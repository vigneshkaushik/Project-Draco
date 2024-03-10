import React from "react";

const SearchSection = () => {
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

  const getImages = async () => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: "Hey",
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="search-section">
      <p>
        Start with a detailed description
        <span className="surprise">Surprise me</span>
      </p>
      <div className="input-container">
        <input placeholder="A sleek, energy-efficient skyscraper with a double-skin facade and integrated wind turbines for renewable energy generation." />
        <button onClick={getImages}>Generate</button>
      </div>
    </section>
  );
};

export default SearchSection;
