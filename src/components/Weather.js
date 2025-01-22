import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );
        setWeather(response.data.current);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
      45: "Foggy", 61: "Light rain", 63: "Moderate rain", 65: "Heavy rain"
    };
    return descriptions[code] || "Unknown";
  };

  if (loading) return <div className="text-gray-600 text-center">Loading weather...</div>;

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg max-w-sm mx-auto text-white">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">Current Weather</h3>
        
        <div className="text-center py-4">
          <p className="text-5xl font-bold mb-2">{Math.round(weather.temperature_2m)}°C</p>
          <p className="text-xl capitalize">{getWeatherDescription(weather.weather_code)}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-white/10 rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm opacity-75">Humidity</p>
            <p className="text-lg font-semibold">{weather.relative_humidity_2m}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-75">Wind Speed</p>
            <p className="text-lg font-semibold">{weather.wind_speed_10m} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;