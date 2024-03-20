import calculatorLogo from "./../assets/investment-calculator-logo.png"

function Header() {
  return (
    <div id="header">
        <img src={calculatorLogo} alt="Investment calculator logo"/>
        <h1>Investment Calculator</h1>
    </div>
  )
}

export default Header