import React from 'react'
import {formatter, calculateInvestmentResults} from "./../util/investment.js"

function ResultTable({userInput}) {

    const result = calculateInvestmentResults(userInput);
    const initialInvestment = 
        result[0].valueEndOfYear-
        result[0].interest-
        result[0].annualInvestment;

    return (
    <table id="result">
        <thead>
            <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest(Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
            </tr>
        </thead>
        <tbody>
            
                {result.map((element, index)=>{
                    const totalInterest = element.valueEndOfYear - element.annualInvestment*element.year - initialInvestment;
                    const totalAmountInvestment = element.valueEndOfYear - totalInterest;

                    return(<tr key={index}>
                        <td>
                            {element.year}
                        </td>
                        <td>
                            {formatter.format(element.valueEndOfYear)}
                        </td>
                        <td>
                            {formatter.format(element.interest)}
                        </td>
                        <td>
                            {formatter.format(totalInterest)}
                        </td>
                        <td>
                            {formatter.format(totalAmountInvestment)}
                        </td>
                    </tr>)
                    })
                }
        </tbody>
    </table>
  )
}

export default ResultTable