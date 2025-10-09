import { useState, useRef } from "react";
import Plant from "./Plant";
import myPlants from "../data/myPlants.json";
import AddPlantForm from "./AddPlantForm";
import Modal from "./Modal";

export default function PlantCatalog() {
  const [plants, setPlants] = useState(myPlants);

  return (
    <div className="catalog">
      <h2>My Plants</h2>
      <div className="plants-container">
        <Modal btnLabel="+" className="add-button">
          <AddPlantForm />
        </Modal>
        {plants.map((p) => (
          <Plant key={p.id} data={p} />
        ))}
      </div>
    </div>
  );
}
