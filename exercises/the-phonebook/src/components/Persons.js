import React from 'react'

const Person = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ persons, filter }) => {
    return (
        persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(p => {
            return <Person key={p.id} name={p.name} number={p.number} />
        })
    )

}

export default Persons
