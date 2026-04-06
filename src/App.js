import React, { useState } from 'react';
import './App.css';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

function App() 
{

      const [transactions, setTransactions] = useState([

        { id: 1, date: '2026-03-01', category: 'Salary', type: 'Income', amount: 5000 },
        { id: 2, date: '2026-03-05', category: 'Rent', type: 'Expense', amount: 1200 },
        { id: 3, date: '2026-03-10', category: 'Food', type: 'Expense', amount: 300 },

      ]); 

          const [role, setRole] = useState("viewer");
          const [category, setCategory] = useState("");
          const [amount, setAmount] = useState("");
          const [type, setType] = useState("Expense");
          const [date, setDate] = useState("");
          const [editId, setEditId] = useState(null);
          const [search, setSearch] = useState("");
          const [sortBy, setSortBy] = useState("");

  // Search filter
      const filteredTransactions = transactions.filter(t =>
        
        t.type.toLowerCase().includes(search.toLowerCase())
      );

  // Sorting
  let sortedTransactions = [...filteredTransactions];

  if (sortBy === "date")
     {
    sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (sortBy === "amount") 
    {
    sortedTransactions.sort((a, b) => b.amount - a.amount);
  }

  // Calculations
  let totalIncome = 0;
  let totalExpense = 0;
  let expenseMap = {};

  transactions.forEach((item) =>
     {
    let val = Number(item.amount);

    if (item.type === "Income")
       {
      totalIncome += val;
    } else {
      totalExpense += val;
      expenseMap[item.category] = (expenseMap[item.category] || 0) + val;
    }
  });

  let totalBalance = totalIncome - totalExpense;

  // Highest Spending Category
  let highestExpenseCat = "None";
  let maxVal = 0;

  for (let cat in expenseMap) 
    {
        if (expenseMap[cat] > maxVal) 
          {
          maxVal = expenseMap[cat];
          highestExpenseCat = cat;
           }
  }

  // Insights Calculations
  let totalTransactions = transactions.length;
  let savings = totalIncome - totalExpense;

  // Charts
  const lineData = {

        labels: transactions.map(t => t.date),
        datasets: [{
          label: 'Net Cash Flow',
          data: transactions.map(t => t.type === "Income" ? t.amount : -t.amount),
          borderColor: 'blue',
          backgroundColor: 'lavender',
          fill: true,
        }]

  };

  const pieData = {

    labels: Object.keys(expenseMap),
    datasets: [{
      data: Object.values(expenseMap),
      backgroundColor: ['royalblue', 'forestgreen', 'orange', 'red', 'purple'],
    }]

  };

  // Add + Edit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !category || !amount)
       {
      alert("Please fill all fields");
      return;
    }

    if (amount <= 0) 
      {
      alert("Amount must be greater than 0");
      return;
    }

    if (editId) 
      {
          const updated = transactions.map(t =>
            t.id === editId ? { id: editId, date, category, type, amount: Number(amount) } : t
          );
          setTransactions(updated);
          setEditId(null);
      } 
      
      else 
          {
              const newEntry = {
                id: Date.now(),
                date,
                category,
                type,
                amount: Number(amount)
              };
              setTransactions([...transactions, newEntry]);
         }

    setCategory("");
    setAmount("");
    setDate("");


  };

  // Delete
  const deleteEntry = (id) => {

    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
  };

  // Start Edit
  const startEdit = (item) => {


    setEditId(item.id);
    setCategory(item.category);
    setAmount(item.amount);
    setType(item.type);
    setDate(item.date);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container">

      <div className="header">

        <h1>expenseTracker</h1> 
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

      </div>

      <div className="stats-row">

        <div className="card">Balance: ${totalBalance}</div>
        <div className="card income">Income: ${totalIncome}</div>
        <div className="card expense">Expenses: ${totalExpense}</div>


      </div>

      <div className="main-layout">
        <div className="left-side">

          {role === "admin" && (
                <div className="box">

                  <h3>{editId ? "Edit Transaction" : "Add Transaction"}</h3>
                  <form onSubmit={handleSubmit}>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                      <option value="Expense">Expense</option>
                      <option value="Income">Income</option>
                    </select>
                    <button type="submit">{editId ? "Update" : "Add Entry"}</button>
                  </form>
                  
                </div>
          )}

          <div className="box">
                            <input
                              type='text'
                              placeholder='Search category'
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                            />

                            <select onChange={(e) => setSortBy(e.target.value)}>
                              <option value="">Sort By</option>
                              <option value="date">Date</option>
                              <option value="amount">Amount</option>
                            </select>

                            <table>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Category</th>
                                  <th>Type</th>
                                  <th>Amount</th>
                                  {role === "admin" && <th>Actions</th>}
                                </tr>
                              </thead>
                              <tbody>
                                {sortedTransactions.length === 0 ? (
                                  <tr>
                                    <td colSpan="5">No Transactions Found</td>
                                  </tr>
                                ) : (
                                  sortedTransactions.map((item) => (
                                    <tr key={item.id}>
                                      <td>{item.date}</td>
                                      <td>{item.category}</td>
                                      <td className={item.type === "Income" ? "income" : "expense"}>
                                        {item.type}
                                      </td>
                                      <td>${item.amount}</td>
                                      {role === "admin" && (
                                        <td className="actionbtn">
                                          <button onClick={() => startEdit(item)}>Edit</button>
                                          <button onClick={() => deleteEntry(item.id)}>Delete</button>
                                        </td>
                                      )}
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
            </div>
        </div>

        <div className="right-side">


                <div className="box">
                  <h3>Spending Distribution</h3>
                  <Doughnut className="boxdata" data={pieData} />
                </div>

                <div className="box">
                  <h3>Cash Flow Trend</h3>
                  <Line  className="boxdata" data={lineData} />
                </div>

                <div className="box insights">
                  <h3>Insights</h3>
                  <p>Highest Spending Category: {highestExpenseCat} ${maxVal}</p>
                  <p>Monthly Income: ${totalIncome}</p>
                  <p>Monthly Expense: ${totalExpense}</p>
                  <p>Monthly Savings: ${savings}</p>
                  <p>Total Transactions: {totalTransactions}</p>
                </div>



        </div>

      </div>
    </div>
  );
}

export default App;