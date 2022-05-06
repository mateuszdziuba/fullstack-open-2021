import React from 'react'

const Person = ({ name, number }) => <>{name} {number}</>

const Persons = ({ persons, filter, onClick }) => {
    return (
        persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(p => {
            return (
                <p>
                <Person key={p.id} name={p.name} number={p.number} /><button onClick={() => onClick(p.id, p.name)}>delete</button>
                </p>
            )
        })
    )

}

export default Persons
