import React, { useState } from 'react';

function App() {

  const api = {
    key: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    // these `get` functions are built-in JS
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className="App">
      <main>
        <div className="search">
          <input type="text" className="searchbar" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <p className="location">{weather.name}, {weather.sys.country}</p>
              <p className="date">{dateBuilder(new Date())}</p>
            </div>
            <div className="weather-box">
              <p className="temp">{Math.round(weather.main.temp)}&#8451;</p>
              <p className="weather">{weather.weather[0].main}</p>
            </div>
          </div>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;
