import React, { useState } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import "./EmiCalculator.css"
const Chart = ({ chartData }) => {
  const labels = chartData.map((data) => data.month);
  const principalData = chartData.map((data) => data.principal.toFixed(2));
  const interestData = chartData.map((data) => data.interest.toFixed(2));
  const balanceData = chartData.map((data) => data.balance.toFixed(2));

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Principal',
        data: principalData,
        backgroundColor: 'rgba(0, 123, 255, 0.4)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Interest',
        data: interestData,
        backgroundColor: 'rgba(255, 193, 7, 0.4)',
        borderColor: 'rgba(255, 193, 7, 1)',
        borderWidth: 1,
      },
      {
        label: 'Balance',
        data: balanceData,
        backgroundColor: 'rgba(40, 167, 69, 0.4)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Line data={data} />;
};

function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [noOfYears, setNoOfYears] = useState('');
  const [roi, setRoi] = useState('');
  const [emi, setEmi] = useState('');
  const [chartData, setChartData] = useState([]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const interestRate = parseFloat(roi) / 100 / 12;
    const numberOfPayments = parseFloat(noOfYears) * 12;

    if (principal && interestRate && numberOfPayments) {
      const emiValue =
        (principal * interestRate * Math.pow(1 + interestRate, numberOfPayments)) /
        (Math.pow(1 + interestRate, numberOfPayments) - 1);

      const chartData = [];
      let balance = principal;
      for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balance * interestRate;
        const principalPayment = emiValue - interestPayment;
        balance -= principalPayment;
        chartData.push({ month: i, principal: principalPayment, interest: interestPayment, balance });
      }

      setEmi(emiValue.toFixed(2));
      setChartData(chartData);
    }
  };

  return (
    <div className=" container card text-center p-5 w-100 " id='main-card' >
      <div style={{display:"flex"}}>
      <h1>kunal </h1>
      <div className="card p-5 " id='card1'> 
      <h1 id='h1'>EMI Calculator</h1>
      <div className="form-group">
        <label>Loan Amount:</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter loan amount"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>No of Years:</label>
        <input
          type="number"
          value={noOfYears}
          onChange={(e) => setNoOfYears(e.target.value)}
          placeholder="Enter number of years"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Rate of Interest:</label>
        <input
          type="number"
          value={roi}
          onChange={(e) => setRoi(e.target.value)}
          placeholder="Enter rate of interest"
          className="form-control"
        />
      </div>
      <div className="mb-4">
        <button onClick={calculateEMI} className="btn btn-primary">
          Calculate
        </button>
        </div>
      </div>
      <img src="https://blog.droomcredit.com/wp-content/uploads/2020/12/EMICalculator.gif" alt="images" width="30%" height="30%" style={{marginLeft:"40px", marginTop:"60px"}}/>


      
      </div>
      {emi && <div className="mb-4">Monthly EMI: {emi}</div>}
      {chartData.length > 0 && (
        <div>
          <h2 className="mb-4">Payment Chart</h2>
          <Chart chartData={chartData} />
          <table className="table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((data) => (
                <tr key={data.month}>
                  <td>{data.month}</td>
                  <td>{data.principal.toFixed(2)}</td>
                  <td>{data.interest.toFixed(2)}</td>
                  <td>{data.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmiCalculator;
