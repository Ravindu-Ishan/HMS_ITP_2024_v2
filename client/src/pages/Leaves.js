import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router

//import components here
import TopNav from "../components/TopNavStaff";
import TopNavAttendance from '../components/TopNavAttendance';

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

  // Handle approve action
  const handleApprove = (id) => {

    // You can make a POST request to your backend API to update the leave status
    axios.approve(`/leaves/approve/${id}`).then((res) => {
      alert("Approved Successfully");

    })
  };

  // Handle reject action
  const handleReject = (id) => {
    // Similar to approve, make a POST request to update the leave status
    axios.reject(`/leaves/reject/${id}`).then((res) => {
      alert("Rejected Successfully");

    })
  };

  return (
    <>
      <div className="navarea">
        <TopNavAttendance />
      </div>

       <main>
        <div>
        
        
          
            {/*------------data display table--------------- */}
            <div className="overflow-x-auto sm:rounded-lg tablestyle">
             <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-white">
                            <tr>
                                <th className="p-3">Date</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">LeaveType</th>
                                <th className="p-3">Reason</th>
                                <th className="p-3">Duration</th>
                                <th className="p-3">Action</th>

                            </tr>
                        </thead>
                 <tbody>
                    
                </tbody>
             
              </table>
           </div>
          </div>
          
      </main>
    </>
  );
};

export default Leaves;
