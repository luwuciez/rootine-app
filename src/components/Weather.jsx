import { useEffect, useState } from "react";
import WeatherSymbol from "./WeatherSymbol";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    fetch(
      // "https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&daily=temperature_2m_min,temperature_2m_max,weather_code&timezone=auto&forecast_days=1"
      "https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&hourly=temperature_2m,weather_code,precipitation_probability&timezone=America%2FLos_Angeles&forecast_days=1"
    )
      .then((response) => response.json())
      .then((weather) => setWeather(weather));
  }, []);

  const handleHourChange = (e) => {
    setCurrentHour(parseInt(e.target.value, 10));
  };

  return (
    <>
      <div className="weather-container">
        <div className="weather__info">
          <h1>Today's Weather</h1>
          <div className="info-container">
            <div className="info-left">
              <p>Temperature</p>
              <div className="info-number">
                <span>{weather?.hourly.temperature_2m[currentHour]}</span>
                <span className="subscript">°C</span>
              </div>
            </div>
            <div className="info-right">
              <p>Precipitation</p>
              <div className="info-number">
                <span>{weather?.hourly.precipitation_probability[currentHour]}</span>
                <span className="subscript">%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="weather__icon">
          <WeatherSymbol code={weather?.hourly.weather_code[currentHour]}></WeatherSymbol>
        </div>
      </div>
      <div className="hour-selector">
        <input
          type="range"
          min="0"
          max="23"
          value={currentHour}
          onChange={handleHourChange}
          className="hour-slider"
        />
        <p className="hour-label">{String(currentHour).padStart(2, "0")}:00</p>
      </div>
    </>
  );
}
