import axios from 'axios'
import { useEffect, useState } from 'react';
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState({})
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const setCountriesFilter = (e) => {
    let currState = e.target.value
    let afterFilter = countries.filter(country => country.name.common.toLowerCase().includes(currState.toLowerCase()))
    setFilter(currState)
    setFilteredCountries(afterFilter)
  }

  return (
    <div>
      <div>find countries <input value={filter} onChange={setCountriesFilter} /></div>
      <Countries countries={filteredCountries} filter={filter} />
    </div>
  )
}

export default App;
