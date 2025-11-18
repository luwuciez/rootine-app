import { useRef, useEffect } from "react";
import placeholder from "../assets/placeholder.png";
import "../App.css";

function PlantDetailsModal({ plant, onClose, onEdit, onDelete }) {
  const modalRef = useRef();

  useEffect(() => {
    if (modalRef.current && plant) {
      modalRef.current.showModal();
    }
  }, [plant]);

  // Handle escape key and click outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && modalRef.current?.open) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    if (modalRef.current) {
      modalRef.current.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (modalRef.current) {
        modalRef.current.removeEventListener("click", handleClickOutside);
      }
    };
  }, [onClose]);

  if (!plant) return null;

  const plantName = plant.plant_name || plant.common_name || "Unknown Plant";
  
  // Handle watering frequency display (both old and new formats)
  let wateringDisplay = "Not specified";
  if (plant.watering_frequency !== undefined) {
    wateringDisplay = `${plant.watering_frequency} days`;
  } else if (plant.watering_interval) {
    const interval = plant.watering_interval;
    const min = interval.min || 0;
    const max = interval.max || min;
    const unit = interval.unit || "days";
    if (min === max) {
      wateringDisplay = `${min} ${unit}`;
    } else {
      wateringDisplay = `${min}-${max} ${unit}`;
    }
  }

  // Handle sunlight display (both array and string formats)
  let sunlightDisplay = plant.sunlight || "Not specified";
  if (Array.isArray(sunlightDisplay)) {
    sunlightDisplay = sunlightDisplay.join(", ");
  }

  return (
    <dialog ref={modalRef} className="modal plant-details-modal">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      
      <div className="plant-details-content">
        {/* Plant Image */}
        <div className="plant-details-image">
          {plant.image ? (
            <img src={plant.image} alt={plantName} />
          ) : (
            <img src={placeholder} alt="Placeholder" />
          )}
        </div>

        {/* Plant Information */}
        <div className="plant-details-info">
          <div className="detail-item">
            <label className="detail-label">Name:</label>
            <p className="detail-value">{plantName}</p>
          </div>

          <div className="detail-item">
            <label className="detail-label">Nickname:</label>
            <p className="detail-value">{plant.nickname || "Not specified"}</p>
          </div>

          <div className="detail-item">
            <label className="detail-label">Location:</label>
            <p className="detail-value">{plant.location || "Not specified"}</p>
          </div>

          <div className="detail-item">
            <label className="detail-label">Watering Frequency:</label>
            <p className="detail-value">{wateringDisplay}</p>
          </div>

          <div className="detail-item">
            <label className="detail-label">Sunlight:</label>
            <p className="detail-value">{sunlightDisplay}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="plant-details-actions">
          <button className="btn edit-btn" onClick={onEdit}>
            Edit
          </button>
          <button className="btn delete-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default PlantDetailsModal;

