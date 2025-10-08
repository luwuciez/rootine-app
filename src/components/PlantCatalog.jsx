import { useState } from "react";
import Plant from "./Plant";
import myPlants from "../data/myPlants.json";

export default function PlantCatalog() {
  const [plants, setPlants] = useState(myPlants);

  function addPlant(plant) {
    setPlants([...plants, plant]);
  }

  return (
    <div className="catalog">
      <h2>My Plants</h2>
      <div className="plants-container">
        {plants.map((p) => (
          <Plant key={p.id} data={p} />
        ))}
      </div>
    </div>
  );
}
