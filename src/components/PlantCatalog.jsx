import { useState } from "react";
import Plant from "./Plant";
import myPlants from "../data/myPlants.json";
import AddPlantForm from "./AddPlantForm";
import Modal from "./Modal";
import "../App.css";

export default function PlantCatalog() {
  const [plants, setPlants] = useState(myPlants);

  function handlePlantAdded(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  }

  return (
    <div className="catalog">
      <h2>My Plants</h2>
      <Modal btnLabel="Add new plant" btnClassName="add-button">
        <AddPlantForm onPlantAdded={handlePlantAdded} />
      </Modal>
      <div className="plants-container">
        {plants.map((p) => (
          <Plant key={p.id} data={p} />
        ))}
      </div>
    </div>
  );
}
