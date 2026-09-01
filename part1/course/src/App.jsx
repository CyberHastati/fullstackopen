import { useState } from 'react'

const Display = (props) => <div>{props.counter}</div> 

const Button = (props) => {
  console.log('props value is', props)
  return <button onClick={props.onClick}>{props.text}</button>
}

const History = (props) => {
  if (props.allClicks.length ===0 ) {
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

  // part1 c
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne  = () => {
    setCounter(counter + 1)
    console.log('increasing, value before', counter)
  }
  const decreaseByOne = () => {
    setCounter(counter - 1)
    console.log('decreasing, value before', counter)
  }
  const setToZero  = () => {
    setCounter(0)
    console.log('resetting to zero, value before', counter)
  }

  // part1 d
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [totalClicks, setTotal] = useState(0)

  const handleLeftClick = () => {
    console.log('got left click')
    setLeft(left+1)
    setTotal(totalClicks+1)
    setAll(allClicks.concat('L'))
  }
  const handleRightClick = () => {
    console.log('got right click')
    setRight(right+1)
    setTotal(totalClicks+1)
    setAll(allClicks.concat('R'))
  }

  return (
    <div>
      <div>
        <h2>part 1 c</h2>
        {left}
        <Button onClick={handleLeftClick} text={'left'}> left </Button>
        <Button onClick={handleRightClick} text={'right'}> right </Button>
        {right}
        <History allClicks={allClicks} />
        <p> total clicks: {totalClicks} </p>
      </div>

      <div>
        <h2>part 1 d</h2>
        <Display counter={counter} />
        <Button onClick={increaseByOne} text={'plus iterate'} />
        <Button onClick={decreaseByOne} text={'minus iterate'} />
        <Button onClick={setToZero} text={'reset to 0'} />
      </div>
    </div>

  )
}

export default App