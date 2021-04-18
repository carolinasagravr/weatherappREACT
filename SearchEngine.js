import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "05703d6d81e5b863b75a18b0bcb7a8ea";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
      <button type="Current">Current</button>
    </form>
  );

  return (
    <div>
      {form}
      <ul>
        {weather.description}
        <br />
        <img src={weather.icon} alt={weather.description} />
        <li temperature>{Math.round(weather.temperature)}°C</li>
        <li>
          Humidity: {weather.humidity}% Wind: {weather.wind}km/h
        </li>
      </ul>
    </div>
  );
}
