import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFor, setSearchFor] = useState('')
  const [errorMessage, setErrorMessage] = useState({ message: null, error: false })

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => setPersons(initialPhonebook))
  }, [])

  const addNewPerson = (e) => {
    e.preventDefault()
    const person = persons.find(p => p.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...person, number: newNumber }
        phonebookService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
            setErrorMessage({ ...errorMessage, message: `Changed ${returnedPerson.name}`, error: false })
          })
          .catch(error => {
            setErrorMessage(
              { ...errorMessage, message: `Information of ${newName} has already been removed from server`, error: true } ,
            )
          })
      }

    } else {

      const newPerson = { name: newName, number: newNumber }
      phonebookService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage({ ...errorMessage, message: `Added ${returnedPerson.name}`, error: false })
        })
        .catch(error => {
          setErrorMessage(error.response.data)
        })
    }

    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setErrorMessage({ message: null, error: false })
    }, 5000)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .remove(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} />
      <Filter value={searchFor} onChange={(e) => setSearchFor(e.target.value)} />

      <h3>add a new</h3>

      <PersonForm
        onSubmit={addNewPerson}
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={searchFor} onClick={handleDelete} />
    </div>
  )
}

export default App