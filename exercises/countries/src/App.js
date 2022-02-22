import axios from 'axios'
import { useEffect, useState } from 'react';
import Countries from './components/Countries'
import FindCountry from './components/FindCountry'

const App = () => {

  const [countries, setCountries] = useState([])
  const [findCountry, setFindCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  })



  return (
    <div>
      <FindCountry findCountry={findCountry} onChange={e => setFindCountry(e.target.value)} />
      <Countries countries={countries} filter={findCountry} />
    </div>
  )
}

export default App;
