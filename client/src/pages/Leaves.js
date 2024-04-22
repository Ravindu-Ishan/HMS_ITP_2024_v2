import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router


import TopNav from "../components/TopNavStaff";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Fetch leaves data from backend API
    axios.get('/leaves')
      .then(response => {
        setLeaves(response.data);
      })
      .catch(error => {
        console.error('Error fetching leaves:', error);
      });
  }, []);

  const handleApprove = (id) => {
    // Handle approve action
    // You can make a POST request to your backend API to update the leave status
  };

  const handleReject = (id) => {
    // Handle reject action
    // Similar to approve, make a POST request to update the leave status
  };

  return (
   
   <div>
      <h1>Leave Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Reason</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave._id}>
              <td>{leave.name}</td>
              <td>{leave.date}</td>
              <td>{leave.leaveType}</td>
              <td>
                <button onClick={() => handleApprove(leave._id)}>Approve</button>
                <button onClick={() => handleReject(leave._id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaves;
