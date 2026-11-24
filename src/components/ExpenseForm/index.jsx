
import {useState, useEffect} from 'react'

import './index.css'

const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const ExpenseForm = props => {
  const {
    addExpense,
    editingExpense,
    updateExpense,
    cancelEdit,
  } = props

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(getTodayDate())

  // Fill the form when editing an expense
  useEffect(() => {
    if (editingExpense !== null) {
      setTitle(editingExpense.title)
      setAmount(String(editingExpense.amount))
      setCategory(editingExpense.category)
      setDate(editingExpense.date)
    }
  }, [editingExpense])

  const onSubmitForm = event => {
    event.preventDefault()

    if (
      title.trim() === '' ||
      amount === '' ||
      Number(amount) <= 0 ||
      date === ''
    ) {
      alert('Please enter valid expense details')
      return
    }

    const expenseDetails = {
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    }

    if (editingExpense !== null) {
      updateExpense({
        ...expenseDetails,
        id: editingExpense.id,
      })
    } else {
      addExpense(expenseDetails)
    }

    // Clear the form
    setTitle('')
    setAmount('')
    setCategory('Food')
    setDate(getTodayDate())
  }

  const onCancelEdit = () => {
    setTitle('')
    setAmount('')
    setCategory('Food')
    setDate(getTodayDate())
    cancelEdit()
  }

  return (
    <div className="expense-form-container">

      <h2>
        {editingExpense !== null ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <form onSubmit={onSubmitForm}>

        <div className="form-group">
          <label htmlFor="title">Expense Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter expense title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={event => setAmount(event.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={event => setCategory(event.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={event => setDate(event.target.value)}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            {editingExpense !== null ? 'Update Expense' : 'Add Expense'}
          </button>

          {editingExpense !== null && (
            <button
              type="button"
              className="cancel-button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  )
}

export default ExpenseForm
