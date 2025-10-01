import { useEffect, useState } from "react";

export default function Weather() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&daily=temperature_2m_min,temperature_2m_max,weather_code&timezone=auto&forecast_days=1"
        )
            .then((response) => response.json())
            .then((weather) => setWeather(weather));
    }, []);
}
