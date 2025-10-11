import { useState } from "react";
import "./PlantFilter.css";

const FILTER_DATA = {
  sort: [
    { id: "a-z", label: "Sort A-Z" },
    { id: "z-a", label: "Sort Z-A" },
  ],
  light: [
    { id: "direct", label: "Direct Light" },
    { id: "low", label: "Low Light" },
  ],
  location: [
    { id: "living-room", label: "Living Room" },
    { id: "bedroom", label: "Bedroom" },
    { id: "kitchen", label: "Kitchen" },
    { id: "balcony", label: "Balcony" },
    { id: "bathroom", label: "Bathroom" },
  ],
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

function FilterSection({ title, options, selected, onSelect, type }) {
  const isMultiSelect = Array.isArray(selected);
  const isSort = type === "sort";

  return (
    <div className="filter-section">
      <h3>{title}</h3>
      <div className={isSort ? "sort-options" : "pill-options"}>
        {options.map((option, index) => {
          const id = option.id ?? index;
          const label = typeof option === "object" ? option.label : option;
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
              {isSort && isActive}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PlantFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    sort: null,
    light: [],
    location: [],
    watering: [],
  });

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

  const clearFilters = () => {
    setFilters({ sort: null, light: [], location: [], watering: [] });
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
                options={FILTER_DATA.sort}
                selected={filters.sort}
                onSelect={(id) => handleSelect("sort", id)}
                type="sort"
              />

              <FilterSection
                title="Light Requirements"
                options={FILTER_DATA.light}
                selected={filters.light}
                onSelect={(id) => handleSelect("light", id)}
                type="light"
              />

              <FilterSection
                title="Location"
                options={FILTER_DATA.location}
                selected={filters.location}
                onSelect={(id) => handleSelect("location", id)}
                type="location"
              />

              <FilterSection
                title="Watering Schedule"
                options={FILTER_DATA.days}
                selected={filters.watering}
                onSelect={(id) => handleSelect("watering", id)}
                type="watering"
              />
            </div>

            <div className="modal-footer">
              <button className="button-secondary" onClick={clearFilters}>
                Clear All
              </button>
              <button
                className="button-primary"
                onClick={() => setIsOpen(false)}
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
