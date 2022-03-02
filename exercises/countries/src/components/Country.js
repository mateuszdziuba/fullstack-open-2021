import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"


const Weather = ({ weather }) => {
    if (weather === undefined) {
        return <>Loading weather...</>
    }
    return (
        <>
            <h2>Weather in {weather.name}</h2>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
            <p>wind {weather.wind.speed} m/s</p>
        </>
    )

}

const Country = ({ country }) => {
    console.log(country)
    const [weather, setWeather] = useState()
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY


    useEffect(() => {

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&appid=${apiKey}&units=metric`)
        .then(result => setWeather(result.data))
    }, [apiKey, country])


    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
            <Weather weather={weather} />
        </>
    )
}

export default Country
