import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Weather from "./components/Weather";
import PlantCatalog from "./components/PlantCatalog";
import PlantFilter from "./components/PlantFilter";

const STORAGE_KEY = "rootine-plants";

// Load plants from localStorage or return empty array
function loadPlantsFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading plants from storage:", error);
    return [];
  }
}

// Save plants to localStorage
function savePlantsToStorage(plants) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
  } catch (error) {
    console.error("Error saving plants to storage:", error);
  }
}

function App() {
  const [filters, setFilters] = useState({
    sort: null,
    light: [],
    location: [],
    watering_frequency: "",
  });
  const [plants, setPlants] = useState(() => loadPlantsFromStorage());
  const [isWateringMode, setIsWateringMode] = useState(false);

  // Save plants to localStorage whenever they change
  useEffect(() => {
    savePlantsToStorage(plants);
  }, [plants]);

  function handlePlantAdded(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  }

  function handlePlantUpdated(updatedPlant) {
    setPlants((prevPlants) => prevPlants.map((p) => (p.id === updatedPlant.id ? updatedPlant : p)));
  }

  function handlePlantDeleted(plantId) {
    setPlants((prevPlants) => prevPlants.filter((p) => p.id !== plantId));
  }

  function handleWateringModeToggle() {
    setIsWateringMode((prevMode) => !prevMode);
  }

  // Toggle watering state for a plant.
  // If isWatered is true, set last_watered to today and store prevLastWatered to allow reverting.
  // If isWatered is false, restore last_watered to prevLastWatered (or date_added fallback).
  function handlePlantWatered(plantId, isWatered, prevLastWatered = null) {
    const today = new Date().toISOString().split("T")[0];
    setPlants((prevPlants) =>
      prevPlants.map((p) => {
        if (p.id !== plantId) return p;
        if (isWatered) {
          return { ...p, last_watered: today };
        } else {
          return { ...p, last_watered: prevLastWatered || p.date_added || null };
        }
      })
    );
  }

  return (
    <div className="app">
      <Navbar />
      <Main>
        <Weather />
        <PlantFilter plants={plants} onFiltersChange={setFilters} />
        <PlantCatalog
          filters={filters}
          plants={plants}
          isWateringMode={isWateringMode}
          onWateringModeToggle={handleWateringModeToggle}
          onPlantWatered={handlePlantWatered}
          onPlantAdded={handlePlantAdded}
          onPlantUpdated={handlePlantUpdated}
          onPlantDeleted={handlePlantDeleted}
        />
      </Main>
    </div>
  );
}

export default App;
