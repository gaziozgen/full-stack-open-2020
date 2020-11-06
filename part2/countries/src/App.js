import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const api_key = process.env.REACT_APP_API_KEY
  const [name, setName] = useState('')
  const [countries, setCountries] = useState([])
  
  // I used random inital weather value for block errors
  const [weather, setWeather] = useState({
    request: {
    type: "City",
    query: "Cascade, Seychelles Islands",
    language: "en",
    unit: "m"
    },
    location: {
    name: "Cascade",
    country: "Seychelles Islands",
    region: "Beau Vallon",
    lat: "-4.667",
    lon: "55.500",
    timezone_id: "Indian/Mahe",
    localtime: "2020-10-30 20:02",
    localtime_epoch: 1604088120,
    utc_offset: "4.0"
    },
    current: {
    observation_time: "04:02 PM",
    temperature: 27,
    weather_code: 116,
    weather_icons: [
    "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
    ],
    weather_descriptions: [
    "Partly cloudy"
    ],
    wind_speed: 0,
    wind_degree: 152,
    wind_dir: "SSE",
    pressure: 1011,
    precip: 0.2,
    humidity: 84,
    cloudcover: 25,
    feelslike: 30,
    uv_index: 6,
    visibility: 10,
    is_day: "yes"
    }
    })

  const countriesToShow = countries.filter(country => country.name.includes(name))

  useEffect(() => {
    console.log('cities')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    console.log('weather')
    if ( countriesToShow.length === 1) {
      axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query='+ countriesToShow[0].name)
      .then(response => {
        //console.log(response.data)
        setWeather(response.data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesToShow.length])
  



  const handleChange = (event) => {
    setName(event.target.value)
  }

  

  return (
    <div>
      {"find countries "}
      <input
        value={name}
        onChange={handleChange}
      />
      <ShowCountries countries={countriesToShow} setName={setName} weather={weather} />
    </div>
  );
}



function ShowCountries({ countries, setName, weather }) {

  
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country =>
          <li key={country.alpha3Code}>{country.name}
            <button onClick={() => setName(country.name)}>show</button></li>

        )}
      </ul>
    )
  } else if (countries.length === 1) {
    console.log(weather)
    return (
      <div>
        <h2>{countries[0].name}</h2>
        <p>
          capital {countries[0].capital}
          <br />
          population {countries[0].population}
        </p>
        <h3>languages</h3>
        <ul>
          {countries[0].languages.map(language =>
            <li key={language.iso639_2}>{language.name}</li>
          )}
        </ul>
        <img src={countries[0].flag} alt="flag.svg" width="200px"></img>
          <h3>Weather in {weather.location.country}</h3>
        <b>temperature:</b> {weather.current.temperature} Celcius
        <br/>
        <img src={weather.current.weather_icons[0]} alt="weatherimage.svg" width="100px"></img>
        <br/>
        <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}


export default App;
