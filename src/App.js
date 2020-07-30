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
      event.target.blur()
      fetch(`${api.base}weather?q=${query}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result);
        })
    }
  }

  const icon = (code) => {
    return `https://openweathermap.org/img/wn/${code}@2x.png`
  }

  const celcius = (temp) => temp - 273.15
  const fahrenheit = (temp) => ((temp - 273.15) * (9/5) + 32)

  // NOTE: default wind speed is in meters/second
  // convert m/s to mph (speed x 2.237)
  const windSpeed = (speed) => speed * 2.237

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
        <h1>Current weather conditions</h1>
        <div className="search">
          <label htmlFor="searching" className="sr-only">Use the input field below to search for a city. If nothing renders, please check the disclaimer in the footer and try again.</label>
          <input type="text" className="searchbar" id="searching" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
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
              <p className="wind">
                Wind: {Math.round(windSpeed(weather.wind.speed))}mph
                <br/>
                {
                  weather.wind.gust ? 
                  `Gust: ${Math.round(windSpeed(weather.wind.gust))}mph`
                  : null
                }
              </p>
            </div>
          </article>
        ) : ("")}
      </main>
      <footer>
        <p><b>Disclaimer:</b> The source data is limited. If your search does not generate a response, check your spelling or try a different city near your original search location. For cities which exist in multiple countries, use the country code (ie. "Bedford, UK"). If there are multiple US cities by the same name, try including the state name (ie. "Paris, TX, US").</p>
      </footer>
    </div>
  );
}

export default App;
