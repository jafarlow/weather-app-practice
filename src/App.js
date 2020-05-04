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
      fetch(`${api.base}weather?q=${query}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
        })
    }
  }

  const icon = (code) => {
    return `http://openweathermap.org/img/wn/${code}@2x.png`
  }

  const celcius = (temp) => temp - 273.15
  const fahrenheit = (temp) => ((temp - 273.15) * (9/5) + 32)

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

  // NOTE: {weather.weather[0].main} gets the primary description for the weather, which is what will be used for changing the background image. {weather.weather[0].description} is the subsection of `main`

  return (
    <div className={(typeof weather.main != "undefined")
      ? ((weather.main.temp > 302)
        ? `App ${weather.weather[0].main}-hot`
        : (weather.main.temp > 289)
        ? `App ${weather.weather[0].main}-warm`
        : (weather.main.temp > 273)
        ? `App ${weather.weather[0].main}-cool`
        : `App ${weather.weather[0].main}-cold`)
      : 'App default'}>
      <main>
        <h1>Check your weather</h1>
        <div className="search">
          <input type="text" className="searchbar" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
          <article>
            <div className="location-box">
              <p className="location">{weather.name}, {weather.sys.country}</p>
              <p className="date">{dateBuilder(new Date())}</p>
            </div>
            <div className="weather-box">
              <p className="temp">{Math.round(celcius(weather.main.temp))}&#8451; | {Math.round(fahrenheit(weather.main.temp))}&#x2109;</p>
              <p className="weather">{weather.weather[0].description}</p>
              <img className="weather-icon" src={icon(weather.weather[0].icon)} alt=""/>
            </div>
          </article>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;
