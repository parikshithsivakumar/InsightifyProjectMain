import React, { useState } from "react";

const RiskAnalysis = () => {
  const [domain, setDomain] = useState("");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let output;

    switch (domain) {
      case "Income Tax":
        const income = Number(formData.income);
        output = income > 700000
          ? `You are liable to pay income tax as your income of ₹${income} exceeds ₹7,00,000.`
          : `No income tax liability. Your income of ₹${income} is within the exemption limit.`;
        break;

      case "Professional Tax":
        const salary = Number(formData.monthlySalary);
        const gender = formData.gender;
        output =
          gender === "female" && salary < 10000
            ? `No professional tax due. Female employees earning below ₹10,000 are exempt.`
            : `Professional tax applicable based on ₹${salary}/month salary.`;
        break;

      case "Loan":
        const cibil = Number(formData.cibil);
        const loanIncome = Number(formData.income);
        const emis = Number(formData.emis);
        const age = Number(formData.age);
        const maxEMI = loanIncome * 0.4;

        if (cibil < 700) {
          output = `Loan eligibility low due to CIBIL score of ${cibil}.`;
        } else if (emis > maxEMI) {
          output = `Too many current EMIs. Max allowed is ₹${maxEMI}, but yours is ₹${emis}.`;
        } else if (age > 60) {
          output = `Loan approval unlikely due to age ${age}.`;
        } else {
          output = `Eligible for personal loan with current profile.`;
        }
        break;

      case "Rental":
        const rent = Number(formData.rent);
        const proposedRent = Number(formData.proposedRent);
        const deposit = Number(formData.deposit);
        const maintenance = Number(formData.maintenance);
        const rentHike = proposedRent - rent;

        if (rentHike > rent * 0.2) {
          output = `Proposed rent hike of ₹${rentHike} is above typical 20% threshold. Negotiate further.`;
        } else if (deposit > 10 * proposedRent) {
          output = `Deposit ₹${deposit} is unusually high (more than 10x rent). May be risky.`;
        } else {
          output = `Rental terms seem reasonable. Proceed with caution.`;
        }
        break;

      case "FD":
        const amount = Number(formData.amount);
        const tenureMonths = Number(formData.tenureMonths);
        const reason = formData.reason;

        if (reason === "critical_illness") {
          output = `FD premature withdrawal of ₹${amount} is justified under critical illness.`;
        } else if (tenureMonths < 6) {
          output = `Penalty likely. Tenure of ${tenureMonths} months is too short.`;
        } else {
          output = `Withdrawal reasonable, but check penalty clauses with the bank.`;
        }
        break;

      default:
        output = "Please select a valid domain.";
    }

    setResult(output);
  };

  const renderForm = () => {
    switch (domain) {
      case "Income Tax":
        return (
          <input
            name="income"
            type="number"
            placeholder="Annual Income (₹)"
            onChange={handleChange}
          />
        );

      case "Professional Tax":
        return (
          <>
            <input
              name="monthlySalary"
              type="number"
              placeholder="Monthly Salary (₹)"
              onChange={handleChange}
            />
            <select name="gender" onChange={handleChange}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </>
        );

      case "Loan":
        return (
          <>
            <input
              name="cibil"
              type="number"
              placeholder="CIBIL Score"
              onChange={handleChange}
            />
            <input
              name="income"
              type="number"
              placeholder="Monthly Income (₹)"
              onChange={handleChange}
            />
            <input
              name="emis"
              type="number"
              placeholder="Monthly EMIs (₹)"
              onChange={handleChange}
            />
            <input
              name="age"
              type="number"
              placeholder="Your Age"
              onChange={handleChange}
            />
          </>
        );

      case "Rental":
        return (
          <>
            <select name="type" onChange={handleChange}>
              <option value="">Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
            <input
              name="rent"
              type="number"
              placeholder="Current Rent (₹)"
              onChange={handleChange}
            />
            <input
              name="proposedRent"
              type="number"
              placeholder="Proposed Rent (₹)"
              onChange={handleChange}
            />
            <input
              name="deposit"
              type="number"
              placeholder="Deposit Amount (₹)"
              onChange={handleChange}
            />
            <input
              name="maintenance"
              type="number"
              placeholder="Monthly Maintenance (₹)"
              onChange={handleChange}
            />
          </>
        );

      case "FD":
        return (
          <>
            <input
              name="amount"
              type="number"
              placeholder="FD Amount (₹)"
              onChange={handleChange}
            />
            <input
              name="tenureMonths"
              type="number"
              placeholder="Tenure Completed (months)"
              onChange={handleChange}
            />
            <select name="reason" onChange={handleChange}>
              <option value="">Reason</option>
              <option value="normal">Normal</option>
              <option value="critical_illness">Critical Illness</option>
            </select>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Risk Analysis Assistant</h2>

      <select
        value={domain}
        onChange={(e) => {
          setDomain(e.target.value);
          setFormData({});
          setResult("");
        }}
      >
        <option value="">Select a Domain</option>
        <option value="Income Tax">Income Tax</option>
        <option value="Professional Tax">Professional Tax</option>
        <option value="Loan">Loan Eligibility</option>
        <option value="Rental">Rental Agreement</option>
        <option value="FD">Fixed Deposit Withdrawal</option>
      </select>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "1rem",
        }}
      >
        {renderForm()}
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
          }}
        >
          Analyze
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#f1f1f1",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <strong>Result:</strong>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default RiskAnalysis;
