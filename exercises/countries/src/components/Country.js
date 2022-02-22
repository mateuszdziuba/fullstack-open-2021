import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"


const Weather = ({ city, code }) => {
   
    const [weatherNow, setWeatherNow] = useState([])

    const apiKey = '9700b2c049dbe0a2e25cce9b613fa8f9'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&appid=${apiKey}&units=metric`
    

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                const weatherData = response.data
                setWeatherNow(weatherData)
            })
    }, [url])

    return (
        <div>
            <h2>Weather in {weatherNow.name}</h2>
            <p>temperature {weatherNow.main.temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weatherNow.weather[0].icon}@2x.png`} alt={weatherNow.weather[0].description}></img>
            <p>wind {weatherNow.wind.speed} m/s</p>
        </div>
    )
}

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
            <Weather city={country.capital[0]} code={country.cca2} />
        </div>
    )
}

export default Country
