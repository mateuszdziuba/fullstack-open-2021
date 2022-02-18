import { useState } from 'react'

const Display = ({ value }) => <div>{value}</div>


const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })

  const [allClicks, setAll] = useState([])

  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }
  

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setClicks({ ...clicks, left: clicks.left + 1 })
  }
  

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setClicks({ ...clicks, right: clicks.right + 1 })
  }
  

  return (
    <div>
      {clicks.left}
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      {clicks.right}
      <History allClicks={allClicks} />
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text='thousand' />
      <Button onClick={() => setToValue(0)} text='reset' />
      <Button onClick={() => setToValue(value + 1)} text='increment' />
    </div>
  )
}
export default App; 