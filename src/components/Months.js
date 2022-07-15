import { useState } from "react"

function Months() {
  const [rangeBalance, setRangeBalance] = useState(20000)
  const [rangeIncome, setRangeIncome] = useState(2000)
  const [rangeExpense, setRangeExpense] = useState(1000)
  const [monthsLeftString, setMonthsLeftString] = useState(
    `Congrats. 
      You don't spend more than you earn.`
  )

  function addMonths(date, months) {
    var d = new Date(date)
    d.setMonth(d.getMonth() + months)
    return d
  }

  function calcMonthsLeft(bal, inc, exp) {
    if (inc >= exp) {
      inc === exp ? setMonthsLeftString(`Be careful, you're not saving`) :
        setMonthsLeftString(`Congrats. 
      You don't spend more than you earn.`)
    } else {
      const monthsLeft = Math.trunc(bal / (exp - inc))
      const dateMonthsLeft = addMonths(new Date(), monthsLeft)
      setMonthsLeftString(
        monthsLeft === 0
          ? `You will be out of money soon!`
          : `You have enough for ${monthsLeft} months.
           You will be out of money in ${dateMonthsLeft.getMonth() + 1
          }/${dateMonthsLeft.getFullYear()}`
      )
    }
  }

  return (
    <div className="months-component">
      <h1 className="months-component__title">
        Calculate when you will run out of money
      </h1>

      <div className="input-box-container">
        <div className="input-box">
          <h2 className="input-box__amount">{rangeBalance} €</h2>
          <input
            type="range"
            className="custom-range"
            min="0"
            max="99999"
            step="100"
            value={rangeBalance}
            onInput={(event) => {
              setRangeBalance(parseInt(event.target.value))
              calcMonthsLeft(
                parseInt(event.target.value),
                rangeIncome,
                rangeExpense
              )
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
              calcMonthsLeft(
                rangeBalance,
                parseInt(event.target.value),
                rangeExpense
              )
            }}
          />
          <h4 className="input-box__title input-box__title--green">
            MONTHLY INCOME
          </h4>
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
              calcMonthsLeft(
                rangeBalance,
                rangeIncome,
                parseInt(event.target.value)
              )
            }}
          />
          <h4 className="input-box__title input-box__title--red">
            MONTHLY EXPENSES
          </h4>
        </div>
      </div>

      <h2 className="months-left line-break">{monthsLeftString}</h2>
    </div>
  )
}

export default Months
