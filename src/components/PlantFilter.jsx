import { useState, useMemo } from "react";
import "./PlantFilter.css";
import "../App.css";

const SORT_OPTIONS = [
  { id: "a-z", label: "Sort A-Z" },
  { id: "z-a", label: "Sort Z-A" },
];

const SUNLIGHT_MAPPING = {
  "Direct-Light": "Direct Light",
  "Low-Light": "Low Light",
  "Part-Shade": "Part Shade",
  "Full-Shade": "Full Shade",
  "Full sun": "Direct Light",
  "Part shade": "Part Shade",
  "Filtered Shade": "Part Shade",
};

function FilterSection({ title, options, selected, onSelect, type }) {
  const isMultiSelect = Array.isArray(selected);
  const isSort = type === "sort";

  return (
    <div className="filter-section">
      <h3>{title}</h3>
      <div className={isSort ? "sort-options" : "pill-options"}>
        {options.map((option, index) => {
          const id = option.id ?? option.value ?? option;
          const label = typeof option === "object" ? (option.label ?? option.value ?? option) : option;
          const isActive = isMultiSelect
            ? selected.includes(id)
            : selected === id;

          const buttonClass = isSort
            ? `sort-option ${isActive ? "active" : ""}`
            : `pill ${type} ${isActive ? "active" : ""}`;

          return (
            <button
              key={id}
              className={buttonClass.trim()}
              onClick={() => onSelect(id)}
            >
              {label}
              {isSort && isActive && " ✓"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PlantFilter({ plants = [], onFiltersChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    sort: null,
    light: [],
    location: [],
    watering_frequency: "",
  });

  // Dynamically extract unique locations and sunlight types from plants
  const filterOptions = useMemo(() => {
    const locations = new Set();
    const sunlightTypes = new Set();

    plants.forEach((plant) => {
      // Extract locations
      if (plant.location) {
        locations.add(plant.location);
      }

      // Extract sunlight types
      if (plant.sunlight) {
        const sunlightArray = Array.isArray(plant.sunlight) ? plant.sunlight : [plant.sunlight];
        sunlightArray.forEach((sun) => {
          const normalized = SUNLIGHT_MAPPING[sun] || sun;
          sunlightTypes.add(normalized);
        });
      }
    });

    return {
      locations: Array.from(locations).sort().map(loc => ({ id: loc, label: loc })),
      sunlight: Array.from(sunlightTypes).sort().map(sun => ({ id: sun, label: sun })),
    };
  }, [plants]);

  const handleSelect = (category, id) => {
    setFilters((prev) => {
      let updatedValue;

      if (category === "sort") {
        updatedValue = prev.sort === id ? null : id;
        return { ...prev, sort: updatedValue };
      }

      const current = prev[category];
      updatedValue = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      return { ...prev, [category]: updatedValue };
    });
  };

  const handleWateringChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      watering_frequency: e.target.value,
    }));
  };

  const clearFilters = () => {
    const clearedFilters = { sort: null, light: [], location: [], watering_frequency: "" };
    setFilters(clearedFilters);
    if (onFiltersChange) {
      onFiltersChange(clearedFilters);
    }
  };

  const applyFilters = () => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
    setIsOpen(false);
  };

  return (
    <div className="container">
      <button className="filter-button" onClick={() => setIsOpen(true)}>
        Filter Plants
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Filter Plants</h2>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <FilterSection
                title="Sort By"
                options={SORT_OPTIONS}
                selected={filters.sort}
                onSelect={(id) => handleSelect("sort", id)}
                type="sort"
              />

              <FilterSection
                title="Light Requirements"
                options={filterOptions.sunlight}
                selected={filters.light}
                onSelect={(id) => handleSelect("light", id)}
                type="light"
              />

              <FilterSection
                title="Location"
                options={filterOptions.locations}
                selected={filters.location}
                onSelect={(id) => handleSelect("location", id)}
                type="location"
              />

              <div className="filter-section">
                <h3>Watering Frequency</h3>
                <input
                  className="form-input"
                  type="number"
                  placeholder="Days between watering"
                  value={filters.watering_frequency}
                  onChange={handleWateringChange}
                  min="1"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="button-secondary" onClick={clearFilters}>
                Clear All
              </button>
              <button
                className="button-primary"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
