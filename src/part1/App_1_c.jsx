import { useState } from 'react'

const Display = (props) => <div>{props.counter}</div> 


const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const App = () => {
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

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )


  return (
    <div>
    <Display counter={counter} />
    <Button onClick={increaseByOne} text={'plus iterate'} />
    <Button onClick={decreaseByOne} text={'minus iterate'} />
    <Button onClick={setToZero} text={'reset to 0'} />
    </div>
  )
}




export default App