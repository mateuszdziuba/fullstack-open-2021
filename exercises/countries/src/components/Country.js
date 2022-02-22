import React from "react"

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map(language => <li>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
        </div>
    )
}

export default Country
