import React, { useState } from 'react';
import axios from 'axios';
import './ExpenseAnalysis.css';
import Header from '../Header'; // adjust path as necessary
import { useEffect } from 'react';



const ExpenseForm = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [isManual, setIsManual] = useState(true); // For manual or upload selection

  const categories = ['Food', 'Entertainment', 'Transport', 'Utilities', 'Health', 'Education'];

  // Handle manual expense submission
  const handleSubmitManual = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken'); // Get JWT token from localStorage
      if (!token) {
        alert('Authentication token missing.');
        return;
      }
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/expenses/add`, // Ensure the endpoint is correct
        { name, amount, date, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Expense added successfully!');
      setName('');
      setAmount('');
      setDate('');
      setCategory('');
    } catch (err) {
      console.error('Error adding expense:', err);
      alert('Error adding expense');
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle PDF upload and extraction
  const handleSubmitUpload = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('file', file);

  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication token missing.');
      return;
    }

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/expenses/upload`, // Ensure this matches the server route for PDF upload
      formData,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    );

    // Check the structure of the server response
    console.log('Response:', response);

    const { extractedData } = response.data; // Assuming the server returns extracted data
    if (extractedData) {
      setName(extractedData.name);
      setAmount(extractedData.amount);
      setDate(extractedData.date);
      setCategory(extractedData.category);
      alert('Expense details extracted successfully from the PDF!');
    } else {
      alert('Expense details extracted successfully from the PDF!');
    }
  } catch (err) {
    console.error('Error processing PDF:', err.response || err); // Log the full error object
    alert('Error processing PDF');
  }
};

  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Authentication token missing.');
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchExpenses();
  }, []);
  return (
    <div className="expense-analysis-container">
       <Header/>
    <div className="expense-main-content">
    <div className="expense-form-container">
       
      
      <form className="expense-form">
        <h2>{isManual ? 'Add Expense (Manual Entry)' : 'Add Expense (Upload PDF)'}</h2>

        {/* Option bar to select Manual or Upload PDF */}
        <div className="option-bar">
          <label>
            <input
              type="radio"
              name="entryMethod"
              checked={isManual}
              onChange={() => setIsManual(true)}
            />
            Manual Entry
          </label>
          <label>
            <input
              type="radio"
              name="entryMethod"
              checked={!isManual}
              onChange={() => setIsManual(false)}
            />
            Upload PDF
          </label>
        </div>

        {/* Conditional rendering for form inputs */}
        {isManual ? (
          // Manual entry form
          <>
            <label htmlFor="name">Expense Name</label>
            <input
              type="text"
              id="name"
              placeholder="e.g. Groceries"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              placeholder="Amount in $"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>

            <button type="submit" className="submit-btn" onClick={handleSubmitManual}>
              Add Expense
            </button>
          </>
        ) : (
          // PDF Upload form
          <>
            <label htmlFor="file">Upload PDF</label>
            <input
              type="file"
              id="file"
              accept=".pdf"
              onChange={handleFileChange}
            />

            {file && (
              <div className="file-details">
                <p>File: {file.name}</p>
              </div>
            )}

            <button type="submit" className="submit-btn" onClick={handleSubmitUpload}>
              Extract and Add Expense
            </button>
          </>
        )}
      </form>
    </div>

     <div className="expense-table-container">
      <h2>Recent Expenses</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount ($)</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, index) => (
            <tr key={index}>
              <td>{exp.name}</td>
              <td>{exp.amount}</td>
              <td>{exp.date}</td>
              <td>{exp.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default ExpenseForm;
