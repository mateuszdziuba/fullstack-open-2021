import React from 'react'

const Header = ({ name }) => <h2>{name}</h2>
  
const Part = ({ name, exercises }) => {
    
    return (
        <p>
            {name} {exercises}
        </p>
    )
}
  
  const Content = ({ parts }) => {
    
    return (
      <div>
        {parts.map((part) =>
            <Part key={part.name} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
  
    
    return (
      <strong>total of {parts.reduce((p, c) => ({ exercises: p.exercises + c.exercises })).exercises} exercises</strong>
    )
  
  }

  const Course = ({ course }) => {
      return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
      </div>
      )
  }

  export default Course
