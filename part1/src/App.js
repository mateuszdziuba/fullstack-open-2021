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

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero
  }
}

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const App = () => {
  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right: 0
  // })

  const left = useCounter()
  const right = useCounter()

  const counter = useCounter()

  const [allClicks, setAll] = useState([])

  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }


  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    left.increase()
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    right.increase()
  }

  // const [name, setName] = useState('')
  // const [born, setBorn] = useState('')
  // const [height, setHeight] = useState('')
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <div>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>
          plus
        </button>
        <button onClick={counter.decrease}>
          minus
        </button>
        <button onClick={counter.zero}>
          zero
        </button>
      </div>
      {left.value}
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      {right.value}
      <History allClicks={allClicks} />
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text='thousand' />
      <Button onClick={() => setToValue(0)} text='reset' />
      <Button onClick={() => setToValue(value + 1)} text='increment' />
      <div>
        <form>
          name:
          <input
            // type={name.type}
            // value={name.value}
            // onChange={name.onChange}
            {...name}
          />
          <br />
          birthdate:
          <input
            // type={born.type}
            // value={born.value}
            // onChange={born.onChange}
            {...born}
          />
          <br />
          height:
          <input
            // type={height.type}
            // value={height.value}
            // onChange={height.onChange}
            {...height}
          />
        </form>
        <div>
          {name.value} {born.value} {height.value}
        </div>
      </div>
    </div>
  )
}
export default App;