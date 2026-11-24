
import './index.css'

const ExpenseList = props => {
  const {
    expenses,
    onEdit,
    onDelete,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    selectedDate,
    setSelectedDate,
  } = props

  return (
    <div className="expense-list-container">

      <h2>My Expenses</h2>

      {/* Search and filters */}
      <div className="filter-container">

        <input
          type="text"
          placeholder="Search expense title..."
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={event => setSelectedCategory(event.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Education">Education</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={event => setSelectedDate(event.target.value)}
        />

        <button
          type="button"
          className="clear-button"
          onClick={() => {
            setSearchText('')
            setSelectedCategory('All')
            setSelectedDate('')
          }}
        >
          Clear Filters
        </button>

      </div>

      {/* Expense items */}
      {expenses.length === 0 ? (
        <p className="empty-message">No expenses found.</p>
      ) : (
        <div className="expense-items">

          {expenses.map(eachExpense => (
            <div className="expense-item" key={eachExpense.id}>

              <div className="expense-details">
                <h3>{eachExpense.title}</h3>

                <p>
                  {eachExpense.category} | {eachExpense.date}
                </p>
              </div>

              <div className="expense-actions">

                <strong>
                  ₹{eachExpense.amount.toFixed(2)}
                </strong>

                <button
                  type="button"
                  className="edit-button"
                  onClick={() => onEdit(eachExpense)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDelete(eachExpense.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default ExpenseList
