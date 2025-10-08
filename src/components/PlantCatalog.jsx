import Plant from "./Plant";
import myPlants from "../data/myPlants.json";

export default function PlantCatalog() {
  return (
    <div className="catalog">
      <h2>My Plants</h2>
      <div className="plants-container">
        {myPlants.map((p) => (
          <Plant data={p}></Plant>
        ))}
      </div>
    </div>
  );
}
