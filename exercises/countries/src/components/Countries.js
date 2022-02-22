import React from "react"
import Country from "./Country"

const Countries = ({ countries, filter }) => {

    const filteredCountries = filter === '' ? [] : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            {
                filteredCountries.length === 1 ?
                    <Country country={filteredCountries[0]} /> :
                    filteredCountries.map(country => <p key={country.cca2}>{country.name.common}</p>)
            }
        </div>
    )

}

export default Countries

