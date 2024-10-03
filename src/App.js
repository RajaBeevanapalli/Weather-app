import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError('City not found or something went wrong');
    }
  };

  const getBackgroundClass = () => {
    if (!weather) return '';
    const weatherCondition = weather.weather[0].main.toLowerCase();

    if (weatherCondition.includes('cloud')) return 'cloudy';
    if (weatherCondition.includes('rain')) return 'rainy';
    if (weatherCondition.includes('sun')) return 'sunny';
    return 'default-weather';
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
}

export default App;
