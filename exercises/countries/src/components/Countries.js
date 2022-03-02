import React, { useEffect } from "react"
import Country from "./Country"
import { useState } from "react"



const Countries = ({ countries, filter}) => {
    const [chosenCountry, setChosenCountry] = useState('')

    const handleClick = (name) => {
        setChosenCountry(name)
    }
    useEffect(() => {
        if (countries.length === 1) setChosenCountry(countries[0])
    }, [countries])

    if (filter === '' && chosenCountry === '') {
        return (
            <></>
        )
    }
    if (chosenCountry === '') {
        return (
            <div>
                {
                    countries.map(country => <p key={country.cca2}>{country.name.common}<button onClick={() => handleClick(country)}>show</button></p>)
                } 
                    
                        
            </div>
        )
    }
    return (
        <div>
                {
                    countries.map(country => <p key={country.cca2}>{country.name.common}<button onClick={() => handleClick(country)}>show</button></p>)
                } 
                    <Country country={chosenCountry}/>
                    
            </div>
    )
}

export default Countries

