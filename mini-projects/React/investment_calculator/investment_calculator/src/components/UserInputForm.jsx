import {useState} from 'react'

function UserInputForm({onInputChange, userInput}) {
    
    return (
    <section  id="user-input">
        <div className="input-group">
            <p>
                <label>Initial Investment</label>
                <input required type="number" name="initialInvestment" value={userInput.initialInvestment} onChange={(event)=>onInputChange('initialInvestment',event.target.value)}/>
            </p>
            <p>
                <label>Annual Investment</label>
                <input required type="number" name="annualInvestment" value={userInput.annualInvestment} onChange={(event)=>onInputChange('annualInvestment',event.target.value)}/>
            </p>
        </div>
        <div className="input-group">
            <p>
                <label>Expected Return</label>
                <input required type="number" name="expectedReturn" value={userInput.expectedReturn} onChange={(event)=>onInputChange('expectedReturn', event.target.value)}/>
            </p>
            <p>
                <label>Duration</label>
                <input required type="number" name="duration" value={userInput.duration} onChange={(event)=>onInputChange('duration',event.target.value)}/>
            </p>
        </div>
    </section>
  )
}

export default UserInputForm