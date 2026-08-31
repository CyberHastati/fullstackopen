import { useState } from 'react'

const TopHeader = ()=> <h1>give feedback</h1>

const StatisticsHeader = ()=> <h1>statistics</h1>


const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const StatisticLine = (props)=> {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const Statistics = (props) => {
  console.log('Statistics updated', props)
  const {good, neutral, bad, all} = props
  if (all === 0) return <p>No feedback given</p>
  const avg = Number.isNaN((good - bad) / all) ? 0 : ((good - bad) / all)
  const per_pos = Number.isNaN(good / all) ? 0 : (good / all * 100)
  return (
    <table>
      <tbody>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={avg}/>
      <StatisticLine text='positive' value={`${per_pos} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodFeedback = () => {
    console.log('got good feedback')
    setGood(good+1)
    setAll(all+1)
  }
  const neutralFeedback = () => {
    console.log('got good feedback')
    setNeutral(neutral+1)
    setAll(all+1)
  }
  const badFeedback = () => {
    console.log('got good feedback')
    setBad(bad+1)
    setAll(all+1)
  }


  return (
    <div>
      <TopHeader />
      <Button onClick={goodFeedback} text={'good'}></Button>
      <Button onClick={neutralFeedback} text={'neutral'}></Button>
      <Button onClick={badFeedback} text={'bad'}></Button>
      <StatisticsHeader />
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App