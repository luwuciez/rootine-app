import { useState, useRef } from "react";
import Plant from "./Plant";
import myPlants from "../data/myPlants.json";

export default function PlantCatalog() {
  const [plants, setPlants] = useState(myPlants);

  return (
    <div className="catalog">
      <h2>My Plants</h2>
      <div className="plants-container">
        <button className="add-button">
          <span>+</span>
        </button>
        {plants.map((p) => (
          <Plant key={p.id} data={p} />
        ))}
      </div>
    </div>
  );
}
