import { useEffect, useState } from "react";
import WeatherSymbol from "./WeatherSymbol";

export default function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&daily=temperature_2m_min,temperature_2m_max,weather_code&timezone=auto&forecast_days=1"
    )
      .then((response) => response.json())
      .then((weather) => setWeather(weather));
  }, []);

  return (
    <div className="weather-container">
      <div className="weather__info">
        <h1>Today's Weather</h1>
        <div className="temperatures">
          <div className="temperature--low">
            <p>Low</p>
            <span>{weather?.daily.temperature_2m_min[0]}</span>
            <span className="celsius">°C</span>
          </div>
          <div className="temperature--high">
            <p>High</p>
            <span>{weather?.daily.temperature_2m_max[0]}</span>
            <span className="celsius">°C</span>
          </div>
        </div>
      </div>
      <div className="weather__icon">
        <WeatherSymbol code={weather?.daily.weather_code[0]}></WeatherSymbol>
      </div>
    </div>
  );
}
