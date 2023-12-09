import {useState} from 'react'

import Header from "./components/Header.jsx"
import UserInputForm from "./components/UserInputForm.jsx"
import ResultTable from "./components/ResultTable.jsx"

const INITIAL_INPUT = {
  initialInvestment: 10000,
  annualInvestment:1200,
  expectedReturn:6,
  duration:10
}

function App() {
  const [userInput, setUserInput] = useState(INITIAL_INPUT);

  const inputIsValid = userInput.duration >= 1;
  function handleInputChange(inputIdentifier, newValue){
    setUserInput(prevInput=>{
        return{...prevInput,
        [inputIdentifier]:+newValue}
    })
    
}

  return (
    <>
      <Header/>
      <UserInputForm userInput={userInput} onInputChange={handleInputChange}/>
      {!inputIsValid && <p className="center">Please enter a duration greater than zero!</p>}
      {inputIsValid &&  <ResultTable userInput={userInput}/>}
    </>
  )
}

export default App
