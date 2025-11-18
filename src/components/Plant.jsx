import { useState, useEffect } from "react";
import placeholder from "../assets/placeholder.png";

export default function Plant({
  data,
  onClick,
  isWateringMode = false,
  wateringInfo = null,
  onToggleWater = null,
}) {
  const plantName = data.plant_name || data.common_name || "Unknown Plant";
  const [isToggled, setIsToggled] = useState(false);
  const [prevLastWatered, setPrevLastWatered] = useState(null);

  useEffect(() => {
    // Reset toggle when leaving watering mode
    if (!isWateringMode) {
      setIsToggled(false);
      setPrevLastWatered(null);
    }
  }, [isWateringMode]);

  function handleCardClick(e) {
    if (isWateringMode) {
      // do nothing; watering is handled by the button
      return;
    }
    if (onClick) onClick();
  }

  function handleToggleClick(e) {
    e.stopPropagation();
    // Toggle the watered state for this plant
    if (!isToggled) {
      // store previous last_watered so we can restore if user untoggles
      setPrevLastWatered(data.last_watered || null);
      setIsToggled(true);
      onToggleWater && onToggleWater(true, data.last_watered || null);
    } else {
      // untoggle -> restore previous last_watered
      onToggleWater && onToggleWater(false, prevLastWatered);
      setIsToggled(false);
      setPrevLastWatered(null);
    }
  }

  return (
    <div
      className={`plant-card ${isWateringMode ? "watering-mode" : ""} ${
        wateringInfo?.isOverdue ? "overdue" : ""
      }`}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      {wateringInfo && !isWateringMode && (
        <div className={`watering-tag ${wateringInfo.isOverdue ? "overdue" : ""}`}>
          {wateringInfo.daysSinceWatered === 0 ? (
            <span>Last watered today</span>
          ) : (
            <span>
              Last watered {wateringInfo.daysSinceWatered} day
              {wateringInfo.daysSinceWatered > 1 ? "s" : ""} ago
            </span>
          )}
        </div>
      )}

      {/* Watering Mode Button Overlay */}
      {isWateringMode && (
        <div className="watering-mode-overlay">
          <button
            className={`water-toggle-btn ${isToggled ? "toggled" : ""}`}
            onClick={handleToggleClick}
          >
            {isToggled ? "Watered" : "Water"}
          </button>
        </div>
      )}

      <div className="card__info">
        <h4>{data.nickname}</h4>
        <p>{plantName}</p>
      </div>
      <div className="card__image">
        {data.image ? <img src={data.image} alt={plantName}></img> : <img src={placeholder}></img>}
      </div>
    </div>
  );
}
