import { useState } from 'react';

const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all) {
    return(
      <table>
        <tbody>
          <StatisticLine text='😊' value={good} />
          <StatisticLine text='😒' value={neutral} />
          <StatisticLine text='😫' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={(good - bad) / all} />
          <StatisticLine text='positive' value={`${good / all * 100}  %`} />
        </tbody>
      </table>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return(
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='😊' />
      <Button onClick={() => setNeutral(neutral + 1)} text='😒' />
      <Button onClick={() => setBad(bad + 1)} text='😫' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
