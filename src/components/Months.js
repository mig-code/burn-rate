import { useEffect, useState } from "react"

function Months() {
 
  const [rangeBalance, setRangeBalance] = useState(20000)
  const [rangeIncome, setRangeIncome] = useState(2000)
  const [rangeExpense, setRangeExpense] = useState(1000)
  const [monthsLeftString, setMonthsLeftString] = useState(
    `${rangeBalance / (rangeIncome - rangeExpense)}`
  )

  function addMonths(date, months) {
    var d = new Date(date)
    d.setMonth(d.getMonth() + months)
    return d
  }

  function calcMonthsLeft() {
    if (rangeIncome >= rangeExpense) {
      setMonthsLeftString("Congrats. You don't spend more than you earn.")
    } else {
      const monthsLeft = Math.trunc(rangeBalance / (rangeExpense - rangeIncome))
      const dateMonthsLeft = addMonths(new Date(), monthsLeft)
      setMonthsLeftString(
        monthsLeft === 0
          ? `You will be out of money soon!`
          : `You have enough for ${monthsLeft} months.
           You will be out of money in ${dateMonthsLeft.getMonth() + 1}/${dateMonthsLeft.getFullYear()}`
      )
    }
  }

  useEffect(calcMonthsLeft, [rangeBalance, rangeIncome, rangeExpense])

  return (
    <div className="months-component">
    <h1 className="months-component__title">Calculate when you will run out of money</h1>
    
    <div className="input-box-container">
        
      <div className="input-box">
        
        <h2 className="input-box__amount">{rangeBalance} €</h2>
        <input
          type="range"
          className="custom-range"
          min="0"
          max="100000"
          step="100"
          defaultValue="20000"
          onInput={(event) => {
            setRangeBalance(parseInt(event.target.value))
          }}
        />
        <h4 className="input-box__title">TOTAL BALANCE</h4>
      </div>

      <div className="input-box">
        
        <h2 className="input-box__amount">{rangeIncome} €</h2>
        <input
          type="range"
          className="custom-range"
          min="0"
          max="10000"
          step="100"
          defaultValue="2000"
          onInput={(event) => {
            setRangeIncome(parseInt(event.target.value))
          }}
        />
        <h4 className="input-box__title input-box__title--green">MONTHLY INCOME</h4>
      </div>
      <div className="input-box">
        
        <h2 className="input-box__amount">{rangeExpense} €</h2>
        <input
          type="range"
          className="custom-range"
          min="0"
          max="10000"
          step="100"
          defaultValue="1000"
          onInput={(event) => {
            setRangeExpense(parseInt(event.target.value))
          }}
        />
        <h4 className="input-box__title input-box__title--red">MONTHLY EXPENSES</h4>
      </div>
      </div>

      <h2 className="months-left line-break">{monthsLeftString}</h2>
    </div>
  )
}

export default Months
