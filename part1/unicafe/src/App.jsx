import React , { useState } from 'react';

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

    const Statistics = ({good, neutral, bad}) => {
        const total = good + neutral + bad
        const average = (good *1 + bad * -1) / (good + neutral + bad)
        const positive = good / (good + neutral + bad) * 100

        return ( 
            total===0
                ? <>No feedback given</>
                : <>
                <table>
                <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={total} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={positive} unit="%" />
                </tbody>
                </table>
                </>
        )
    }

const StatisticLine = ({text, value, unit}) => {
    return (
        <> 
        <tr>
            <td> {text} </td>
            <td> {value} {unit||false} </td>
        </tr>
        </>
    ) 
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseGoodByOne = () =>{
        const updatedGood = good + 1
        setGood(updatedGood)
    }

    const increaseNeutralByOne = () =>{
        const updatedNeutral = neutral + 1
        setNeutral(updatedNeutral)
    }

    const increaseBadByOne = () =>{
        const updatedBad = bad + 1
        setBad(updatedBad)
    }

    return (
        <div>
        <h1>give feedback</h1>
        <Button onClick={increaseGoodByOne} text="good" />
        <Button onClick={increaseNeutralByOne} text="neutral" />
        <Button onClick={increaseBadByOne} text="bad" />
        <h1>statistics</h1>
        <Statistics 
            good={good}
            neutral={neutral}
            bad={bad}
        />
        </div>
    )
}

export default App
