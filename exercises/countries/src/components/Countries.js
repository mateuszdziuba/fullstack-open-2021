import React from "react"
import Country from "./Country"
import { useState, useEffect } from "react"



const Countries = ({ countries, filter, found }) => {

    const [chosenCountry, setChosenCountry] = useState('')
    const [countryFound, setCountryFound] = useState(found)

    useEffect(() => {
        if(found) {
            let cf = countries[0]
            setChosenCountry(cf) 
            setCountryFound(true)
        }
    }, [found, countries, chosenCountry])

    const handleClick = (name) => {
        setChosenCountry(name)
        setCountryFound(true)
    }

    if (filter === '') {
        return (
            <div></div>
        )
    }
    if (countryFound) {
        return (
            <div>
                {
                    countries.map(country => <p key={country.cca2}>{country.name.common}<button onClick={() => handleClick(country)}>show</button></p>)
                } 
                    <Country country={chosenCountry}/>
                        
            </div>
        )
    }
    return (
        <div>
                {
                    countries.map(country => <p key={country.cca2}>{country.name.common}<button onClick={() => handleClick(country)}>show</button></p>)
                } 
                    
            </div>
    )
}

export default Countries

