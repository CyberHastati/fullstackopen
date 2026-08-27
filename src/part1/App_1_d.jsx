import { useState } from 'react'



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
      {left}
      <Button onClick={handleLeftClick} text={'left'}> left </Button>
      <Button onClick={handleRightClick} text={'right'}> right </Button>
      {right}
      <History allClicks={allClicks} />
      <p> total clicks: {totalClicks} </p>
    </div>
  )
}

export default App