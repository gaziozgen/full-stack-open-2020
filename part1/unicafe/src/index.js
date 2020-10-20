import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)


  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={increaseGood}
        text='good'
      />
      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />
      <Button
        handleClick={increaseBad}
        text='bad'
      />
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic
            value={good}
            text="good"
          />
          <Statistic
            value={neutral}
            text="neutral"
          />
          <Statistic
            value={bad}
            text="bad"
          />
          <Statistic
            value={all}
            text="all"
          />
          <Statistic
            value={average}
            text="average"
          />
          <Statistic
            value={positive}
            text="positive"
          />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({ value, text }) => {
  return (
    <tr><td>{text}</td><td>{value ? value : 0}</td></tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)