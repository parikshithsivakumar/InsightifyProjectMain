import React, { useState } from "react";
import './Support.css'; // Importing CSS for styling

const Support = () => {
  const [name, setName] = useState("");
  const [issue, setIssue] = useState("");
  const [feedback, setFeedback] = useState(""); // You can add a field for additional feedback
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !issue || !feedback) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Prepare the data to send to the backend
    const feedbackData = {
      name,
      issue,
      feedback
    };

    // Send feedback data to the backend API
    fetch(`${process.env.REACT_APP_API_URL}/feedback/submit-feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackData)  // Send data as JSON
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        setMessage(data.message);  // Display success message from backend
      } else {
        setMessage(data.error);  // Display error message from backend
      }
    })
    .catch((err) => {
      setMessage('Error submitting feedback. Please try again later.');
      console.error('Error:', err);
    });

    // Clear the form
    setName("");
    setIssue("");
    setFeedback("");
  };

  return (
    <div className="support-container">
      <div className="support-header">
        <h1>Need Help? We're Here to Assist!</h1>
        <p>If you have any questions or need support, feel free to reach out by filling out the form below.</p>
      </div>

      {/* Direct Support Section */}
      <div className="support-section">
        <h2>Contact Support</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Your Issue:</label>
            <textarea
              placeholder="Describe your issue or query"
              rows="4"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Your Feedback:</label>
            <textarea
              placeholder="Additional comments or feedback"
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        {message && <p className="feedback-message">{message}</p>}
      </div>
    </div>
  );
};

export default Support;
