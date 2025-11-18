import { useState } from "react";
import Plant from "./Plant";
import myPlants from "../data/myPlants.json";
import AddPlantForm from "./AddPlantForm";
import PlantDetailsModal from "./PlantDetailsModal";
import Modal from "./Modal";
import "../App.css";

export default function PlantCatalog() {
  const [plants, setPlants] = useState(myPlants);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function handlePlantAdded(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
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
    setPlants((prevPlants) =>
      prevPlants.map((p) => (p.id === updatedPlant.id ? updatedPlant : p))
    );
    setSelectedPlant(updatedPlant);
    setIsEditModalOpen(false);
    setIsDetailsModalOpen(true);
  }

  function handleDelete() {
    if (selectedPlant) {
      setPlants((prevPlants) =>
        prevPlants.filter((p) => p.id !== selectedPlant.id)
      );
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
        {plants.map((p) => (
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
