import React from 'react';

function App() {

  const api = {
    key: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
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
          <input type="text" className="searchbar" />
        </div>
        <div className="location-box">
          <div className="location">Boston, US</div>
          <div className="data">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <p className="temp">15C</p>
          <p className="weather">SUNNY</p>
        </div>
      </main>
    </div>
  );
}

export default App;
