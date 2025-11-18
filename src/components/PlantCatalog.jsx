import { useState, useMemo } from "react";
import Plant from "./Plant";
import myPlants from "../data/myPlants.json";
import AddPlantForm from "./AddPlantForm";
import PlantDetailsModal from "./PlantDetailsModal";
import Modal from "./Modal";
import "../App.css";

const SUNLIGHT_MAPPING = {
  "Direct-Light": "Direct Light",
  "Low-Light": "Low Light",
  "Part-Shade": "Part Shade",
  "Full-Shade": "Full Shade",
  "Full sun": "Direct Light",
  "Part shade": "Part Shade",
  "Filtered Shade": "Part Shade",
};

export default function PlantCatalog({ 
  filters = null, 
  plants: plantsProp = null,
  onPlantAdded: onPlantAddedProp = null,
  onPlantUpdated: onPlantUpdatedProp = null,
  onPlantDeleted: onPlantDeletedProp = null,
}) {
  const [localPlants, setLocalPlants] = useState(myPlants);
  const plants = plantsProp || localPlants;
  
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Helper function to normalize sunlight values
  const normalizeSunlight = (sunlight) => {
    if (!sunlight) return [];
    const sunlightArray = Array.isArray(sunlight) ? sunlight : [sunlight];
    return sunlightArray.map((sun) => SUNLIGHT_MAPPING[sun] || sun);
  };

  // Helper function to get watering frequency from plant
  const getWateringFrequency = (plant) => {
    if (plant.watering_frequency !== undefined && plant.watering_frequency !== null) {
      return plant.watering_frequency;
    }
    if (plant.watering_interval) {
      const avg = (plant.watering_interval.min + plant.watering_interval.max) / 2;
      return plant.watering_interval.unit === "weeks" ? avg * 7 : avg;
    }
    return null;
  };

  // Filter and sort plants
  const filteredAndSortedPlants = useMemo(() => {
    if (!filters) {
      return plants;
    }

    let filtered = [...plants];

    // Filter by light requirements
    if (filters.light && filters.light.length > 0) {
      filtered = filtered.filter((plant) => {
        const plantSunlight = normalizeSunlight(plant.sunlight);
        return filters.light.some((filterLight) =>
          plantSunlight.includes(filterLight)
        );
      });
    }

    // Filter by location
    if (filters.location && filters.location.length > 0) {
      filtered = filtered.filter((plant) =>
        filters.location.includes(plant.location)
      );
    }

    // Filter by watering frequency
    if (filters.watering_frequency && filters.watering_frequency !== "") {
      const targetFrequency = parseInt(filters.watering_frequency);
      filtered = filtered.filter((plant) => {
        const plantFrequency = getWateringFrequency(plant);
        if (plantFrequency === null) return false;
        // Allow some tolerance (within 2 days)
        return Math.abs(plantFrequency - targetFrequency) <= 2;
      });
    }

    // Sort alphabetically
    if (filters.sort) {
      filtered.sort((a, b) => {
        const nameA = (a.plant_name || a.common_name || a.nickname || "").toLowerCase();
        const nameB = (b.plant_name || b.common_name || b.nickname || "").toLowerCase();
        
        if (filters.sort === "a-z") {
          return nameA.localeCompare(nameB);
        } else if (filters.sort === "z-a") {
          return nameB.localeCompare(nameA);
        }
        return 0;
      });
    }

    return filtered;
  }, [plants, filters]);

  function handlePlantAdded(newPlant) {
    if (onPlantAddedProp) {
      onPlantAddedProp(newPlant);
    } else {
      setLocalPlants((prevPlants) => [...prevPlants, newPlant]);
    }
  }

  function handlePlantClick(plant) {
    setSelectedPlant(plant);
    setIsDetailsModalOpen(true);
  }

  function handleCloseDetailsModal() {
    setIsDetailsModalOpen(false);
    setSelectedPlant(null);
  }

  function handleEdit() {
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedPlant(null);
  }

  function handlePlantUpdated(updatedPlant) {
    if (onPlantUpdatedProp) {
      onPlantUpdatedProp(updatedPlant);
    } else {
      setLocalPlants((prevPlants) =>
        prevPlants.map((p) => (p.id === updatedPlant.id ? updatedPlant : p))
      );
    }
    setSelectedPlant(updatedPlant);
    setIsEditModalOpen(false);
    setIsDetailsModalOpen(true);
  }

  function handleDelete() {
    if (selectedPlant) {
      if (onPlantDeletedProp) {
        onPlantDeletedProp(selectedPlant.id);
      } else {
        setLocalPlants((prevPlants) =>
          prevPlants.filter((p) => p.id !== selectedPlant.id)
        );
      }
      setIsDetailsModalOpen(false);
      setSelectedPlant(null);
    }
  }

  return (
    <div className="catalog">
      <h2>My Plants</h2>
      <Modal btnLabel="Add new plant" btnClassName="add-button">
        <AddPlantForm onPlantAdded={handlePlantAdded} />
      </Modal>
      <div className="plants-container">
        {filteredAndSortedPlants.map((p) => (
          <Plant key={p.id} data={p} onClick={() => handlePlantClick(p)} />
        ))}
      </div>

      {/* Plant Details Modal */}
      {isDetailsModalOpen && selectedPlant && (
        <PlantDetailsModal
          plant={selectedPlant}
          onClose={handleCloseDetailsModal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Edit Plant Modal */}
      {isEditModalOpen && selectedPlant && (
        <Modal 
          btnLabel="" 
          btnClassName="" 
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
        >
          <AddPlantForm
            plantToEdit={selectedPlant}
            onPlantUpdated={handlePlantUpdated}
            onClose={handleCloseEditModal}
          />
        </Modal>
      )}
    </div>
  );
}
