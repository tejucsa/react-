
import './index.css'

const ExpenseSummary = props => {
  const {expenses} = props

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (total, eachExpense) => {
      return total + eachExpense.amount
    },
    0
  )

  // Calculate category-wise expenses
  const categorySummary = expenses.reduce(
    (summary, eachExpense) => {
      const category = eachExpense.category

      if (summary[category]) {
        summary[category] += eachExpense.amount
      } else {
        summary[category] = eachExpense.amount
      }

      return summary
    },
    {}
  )

  return (
    <div className="summary-container">

      <div className="total-card">
        <h3>Total Expenses</h3>
        <h1>₹{totalExpenses.toFixed(2)}</h1>
        <p>{expenses.length} expenses recorded</p>
      </div>

      <div className="category-card">
        <h2>Category-wise Summary</h2>

        {Object.entries(categorySummary).length === 0 ? (
          <p>No expenses recorded yet.</p>
        ) : (
          Object.entries(categorySummary).map(
            ([category, amount]) => (
              <div className="category-row" key={category}>
                <span>{category}</span>
                <strong>₹{amount.toFixed(2)}</strong>
              </div>
            )
          )
        )}
      </div>

    </div>
  )
}

export default ExpenseSummary
