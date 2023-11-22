import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState(" ");
  let [display, setDisplay] = useState(false);
  let [weather, setWeather] = useState(null);

  function displayWeather(response) {
    setDisplay(true);
    setWeather({
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = `d1a86552de255334f6117b348c4519bd`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  function updateCity() {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="type a city" onChange={updateCity} />
      <input type="submit" value="search" />
    </form>
  );

  if (display) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {weather.temp}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.icon} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
