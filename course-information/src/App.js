const Header = (props) => {
  const { course } = props
  return(
    <h1>{course}</h1>
  )
}

const Part = (props) => {
  const { part, exercises } = props
  return (
    <p>
        {part} {exercises}
    </p>
  )
}

const Content = (props) => {
  const { part1, part2, part3, exercises1, exercises2, exercises3 } = props
  return(
    <div>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </div>
  )
}

const Total = (props) => {
  const { exercises1, exercises2, exercises3 } = props
  return(
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const exercises = { exercises1, exercises2, exercises3 }
  const part = { part1, part2, part3 }

  return (
    <div>
      <Header course={course} />
      <Content { ...part} { ...exercises } />
      <Total {...exercises} />
    </div>
  )
}

export default App