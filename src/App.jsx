
import {useState, useEffect} from 'react'

import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'

import './App.css'

const App = () => {
  // Store all expenses
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses')

    return savedExpenses ? JSON.parse(savedExpenses) : []
  })

  // Store the expense currently being edited
  const [editingExpense, setEditingExpense] = useState(null)

  // Search and filter states
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDate, setSelectedDate] = useState('')

  // Save expenses in localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  // Add a new expense
  const addExpense = newExpense => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now(),
    }

    setExpenses(prevExpenses => [...prevExpenses, expenseWithId])
  }

  // Delete an expense
  const deleteExpense = id => {
    setExpenses(prevExpenses =>
      prevExpenses.filter(eachExpense => eachExpense.id !== id),
    )

    if (editingExpense && editingExpense.id === id) {
      setEditingExpense(null)
    }
  }

  // Select an expense for editing
  const editExpense = expense => {
    setEditingExpense(expense)
  }

  // Update an existing expense
  const updateExpense = updatedExpense => {
    setExpenses(prevExpenses =>
      prevExpenses.map(eachExpense => {
        if (eachExpense.id === updatedExpense.id) {
          return updatedExpense
        }

        return eachExpense
      }),
    )

    setEditingExpense(null)
  }

  // Search and filter expenses
  const filteredExpenses = expenses.filter(eachExpense => {
    const matchesSearch = eachExpense.title
      .toLowerCase()
      .includes(searchText.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' ||
      eachExpense.category === selectedCategory

    const matchesDate =
      selectedDate === '' || eachExpense.date === selectedDate

    return matchesSearch && matchesCategory && matchesDate
  })

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p>Manage your daily expenses easily</p>
      </header>

      {/* Display total expenses and category summary */}
      <ExpenseSummary expenses={expenses} />

      {/* Add or edit an expense */}
      <ExpenseForm
        addExpense={addExpense}
        editingExpense={editingExpense}
        updateExpense={updateExpense}
        cancelEdit={() => setEditingExpense(null)}
      />

      {/* Display, search, filter, edit and delete expenses */}
      <ExpenseList
        expenses={filteredExpenses}
        onEdit={editExpense}
        onDelete={deleteExpense}
        searchText={searchText}
        setSearchText={setSearchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  )
}

export default App
