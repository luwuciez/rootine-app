import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Weather from "./components/Weather";
import PlantCatalog from "./components/PlantCatalog";
import PlantFilter from "./components/PlantFilter";
import myPlants from "./data/myPlants.json";

function App() {
  const [filters, setFilters] = useState({
    sort: null,
    light: [],
    location: [],
    watering_frequency: "",
  });
  const [plants, setPlants] = useState(myPlants);

  function handlePlantAdded(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  }

  function handlePlantUpdated(updatedPlant) {
    setPlants((prevPlants) =>
      prevPlants.map((p) => (p.id === updatedPlant.id ? updatedPlant : p))
    );
  }

  function handlePlantDeleted(plantId) {
    setPlants((prevPlants) => prevPlants.filter((p) => p.id !== plantId));
  }

  return (
    <div className="app">
      <Navbar />
      <Main>
        <Weather />
        <PlantFilter 
          plants={plants} 
          onFiltersChange={setFilters}
        />
        <PlantCatalog 
          filters={filters}
          plants={plants}
          onPlantAdded={handlePlantAdded}
          onPlantUpdated={handlePlantUpdated}
          onPlantDeleted={handlePlantDeleted}
        />
      </Main>
    </div>
  );
}

export default App;
