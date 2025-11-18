import { useState, useRef, useEffect } from "react";
import { searchPlants } from "../services/plantApi";
import "../App.css";
import uploadPhoto from "../assets/upload_Photo.svg";

function AddPlantForm({ onPlantAdded, onPlantUpdated, onClose, plantToEdit }) {
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef();
  const isEditMode = !!plantToEdit;

  // Form state - initialize with plantToEdit if editing
  const [formData, setFormData] = useState({
    plant_name: plantToEdit?.plant_name || plantToEdit?.common_name || "",
    nickname: plantToEdit?.nickname || "",
    location: plantToEdit?.location || "",
    sunlight:
      plantToEdit?.sunlight ||
      (Array.isArray(plantToEdit?.sunlight) ? plantToEdit.sunlight[0] : ""),
    watering_frequency:
      plantToEdit?.watering_frequency ||
      (plantToEdit?.watering_interval
        ? plantToEdit.watering_interval.unit === "weeks"
          ? ((plantToEdit.watering_interval.min + plantToEdit.watering_interval.max) / 2) * 7
          : (plantToEdit.watering_interval.min + plantToEdit.watering_interval.max) / 2
        : ""),
  });

  // Initialize photo if editing and plant has image
  useEffect(() => {
    if (plantToEdit?.image) {
      setPhoto(plantToEdit.image);
    }
  }, [plantToEdit]);

  // Plant search state
  const [searchQuery, setSearchQuery] = useState(
    plantToEdit?.plant_name || plantToEdit?.common_name || ""
  );
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Sunlight options
  const sunlightOptions = [
    { value: "Direct-Light", label: "Direct Light" },
    { value: "Low-Light", label: "Low Light" },
    { value: "Part-Shade", label: "Part Shade" },
    { value: "Full-Shade", label: "Full Shade" },
  ];

  // Debounced plant search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchPlants(searchQuery);
      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (showResults && !event.target.closest("[data-plant-search]")) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults]);

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  }

  function handleBoxClick() {
    fileInputRef.current.click();
  }

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handlePlantSelect(plant) {
    setFormData((prev) => ({
      ...prev,
      plant_name: plant.common_name || plant.scientific_name || "",
    }));
    setSearchQuery(plant.common_name || plant.scientific_name || "");
    setShowResults(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const plantData = {
      plant_name: formData.plant_name,
      nickname: formData.nickname,
      location: formData.location,
      sunlight: formData.sunlight,
      watering_frequency: parseInt(formData.watering_frequency) || 0,
      image: photo || "",
    };

    if (isEditMode) {
      // Edit mode - preserve id, date_added, and last_watered
      const updatedPlant = {
        ...plantToEdit,
        ...plantData,
        id: plantToEdit.id,
        date_added: plantToEdit.date_added,
        last_watered: plantToEdit.last_watered,
      };
      if (onPlantUpdated) {
        onPlantUpdated(updatedPlant);
      }
    } else {
      // Add mode - generate id and date_added
      const today = new Date().toISOString().split("T")[0];
      const newPlant = {
        ...plantData,
        id: Date.now().toString(),
        date_added: today,
        last_watered: today,
      };
      if (onPlantAdded) {
        onPlantAdded(newPlant);
      }

      // Reset form only when adding
      setFormData({
        plant_name: "",
        nickname: "",
        location: "",
        sunlight: "",
        watering_frequency: "",
      });
      setPhoto(null);
      setSearchQuery("");
      setSearchResults([]);
    }

    // Close modal if onClose is provided
    if (onClose) {
      onClose();
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Add Photo input */}
        <div className="photo-upload">
          <div className="photo-preview" onClick={handleBoxClick}>
            {photo ? (
              <img src={photo} alt="Plant preview" />
            ) : (
            <img
              src={uploadPhoto}
              alt="Upload plant photo"
              className="photo-placeholder-img"
            />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>

        {/* Name Your Plant */}
        <div className="form-control-stack">
          <label className="form-title">Name Your Plant:</label>
          <div className="input-stack">
            <div style={{ position: "relative" }} data-plant-search>
              <input
                className="form-input"
                name="plant_name"
                type="text"
                placeholder="Search Plant Name"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    plant_name: e.target.value,
                  }));
                }}
                onFocus={() => {
                  if (searchResults.length > 0) {
                    setShowResults(true);
                  }
                }}
                required
              />
              {showResults && searchResults.length > 0 && (
                <div
                  data-plant-search
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    border: "1px solid #596A3A",
                    borderRadius: "6px",
                    maxHeight: "200px",
                    overflowY: "auto",
                    zIndex: 1000,
                    marginTop: "4px",
                  }}
                >
                  {searchResults.slice(0, 5).map((plant) => (
                    <div
                      key={plant.id}
                      onClick={() => handlePlantSelect(plant)}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#EAEFE5";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                      }}
                    >
                      {plant.common_name || plant.scientific_name}
                    </div>
                  ))}
                </div>
              )}
              {isSearching && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    padding: "8px",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  Searching...
                </div>
              )}
            </div>
            <input
              className="form-input"
              name="nickname"
              type="text"
              placeholder="Nickname"
              value={formData.nickname}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <br></br>

        {/* Plant Location */}
        <div className="form-control">
          <label className="form-title">Plant Location:</label>
          <input
            className="form-input"
            name="location"
            type="text"
            placeholder="Room"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        {/* Watering Frequency */}
        <div className="form-control">
          <label className="form-title">Watering Frequency:</label>
          <input
            className="form-input"
            name="watering_frequency"
            type="number"
            placeholder="Days between watering"
            value={formData.watering_frequency}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        {/* Sunlight */}
        <div className="form-control">
          <label className="form-title">Sunlight:</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {sunlightOptions.map((option) => (
              <label
                key={option.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  name="sunlight"
                  type="radio"
                  value={option.value}
                  checked={formData.sunlight === option.value}
                  onChange={handleInputChange}
                  required
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn primary">
          {isEditMode ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default AddPlantForm;
