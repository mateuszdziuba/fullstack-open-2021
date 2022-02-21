import React from 'react'

const Person = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ persons, searchFor }) => {

    return (
        persons.filter(person => person.name.includes(searchFor)).map(person => {
            return <Person key={person.id} name={person.name} number={person.number} />
        })
    )

}

export default Persons
