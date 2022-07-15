import { useState } from "react"

function Months() {

  const [ranges, setRanges] = useState({
    balance: 20000,
    income: 2000,
    expense: 1000,
  })

  const [monthsLeftString, setMonthsLeftString] = useState(
    `Congrats. 
      You don't spend more than you earn.`
  )

  function updateRangesAndMonths(event) {
    const { name, value } = event.target
    setRanges({ ...ranges, [name]: parseInt(value) })
    calcMonthsLeft(
      name === "balance" ? parseInt(value) : ranges.balance,
      name === "income" ? parseInt(value) : ranges.income,
      name === "expense" ? parseInt(value) : ranges.expense
    )
  }

  function addMonths(date, months) {
    var d = new Date(date)
    d.setMonth(d.getMonth() + months)
    return d
  }

  function calcMonthsLeft(bal, inc, exp) {
    if (inc >= exp) {
      inc === exp
        ? setMonthsLeftString(`Be careful, you're not saving`)
        : setMonthsLeftString(`Congrats. 
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
          <h2 className="input-box__amount">{ranges.balance} €</h2>
          <input
            type="range"
            className="custom-range"
            min="0"
            max="99999"
            step="100"
            name="balance"
            value={ranges.balance}
            onChange={updateRangesAndMonths}

          />
          <h4 className="input-box__title">TOTAL BALANCE</h4>
        </div>

        <div className="input-box">
          <h2 className="input-box__amount">{ranges.income} €</h2>
          <input
            type="range"
            className="custom-range"
            min="0"
            max="10000"
            step="100"
            name="income"
            value={ranges.income}
            onChange={updateRangesAndMonths}

          />
          <h4 className="input-box__title input-box__title--green">
            MONTHLY INCOME
          </h4>
        </div>
        <div className="input-box">
          <h2 className="input-box__amount">{ranges.expense} €</h2>
          <input
            type="range"
            className="custom-range"
            min="0"
            max="10000"
            step="100"
            name="expense"
            value={ranges.expense}
            onChange={updateRangesAndMonths}

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
