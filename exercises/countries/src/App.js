import axios from 'axios'
import { useEffect, useState } from 'react';
import Countries from './components/Countries'
import FindCountry from './components/FindCountry'

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchFor, setSearchFor] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [found, setFound] = useState(filteredCountries.length === 1)
  


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const setCountry = (e) => {
    let currState = e.target.value
    setSearchFor(currState)
    let afterFilter = countries.filter(country => country.name.common.toLowerCase().includes(currState.toLowerCase()))
    setFilteredCountries(afterFilter)
    setFound(afterFilter.length === 1)
  }

  return (
    <div>
      <FindCountry searchFor={searchFor} onChange={setCountry} />
      <Countries countries={filteredCountries} filter={searchFor} found={found} />
    </div>
  )
}

export default App;
