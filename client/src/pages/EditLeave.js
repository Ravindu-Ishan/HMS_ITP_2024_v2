import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EmptyNavArea from "../components/EmptyNavArea";

const EditLeave = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [leaveDate, setleaveDate] = useState("");
  const [leaveName, setleaveName] = useState("");
  const [leaveType, setleaveType] = useState("");
  const [leaveReason, setleaveReason] = useState("");
  const [leaveDuration, setleaveDuration] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/user/userLeaves/getbyID/${id}`);
        if (response.data.success) {
          const { leaveDate, leaveName, leaveType,  leaveReason, leaveDuration} = response.data.post;
          setleaveDate(leaveDate);
          setleaveName(leaveName);
          setleaveType(leaveType);
          setleaveReason(leaveReason);
          setleaveDuration(leaveDuration);
        } else {
          console.error('Failed to fetch post data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (id) {
      fetchData();
    }

    // Cleanup function
    return () => {
      // Perform any cleanup here if needed
    };
  }, [id]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   switch (name) {

  //     case "Location":
  //       setLocation(value);
  //       break;
  //     case "ScheduleTime":
  //       setTime(value);
  //       break;
  //     case "ScheduleDate":
  //       setDate(value);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        leaveDate,
        leaveName,
        leaveType,
        leaveReason,
        leaveDuration
      };

      const response = await axios.put(`/user/userLeaves/update/${id}`, data);
      if (response.data.success) {
        alert("Post Updated Successfully");

        setleaveDate("");
        setleaveName("");
        setleaveType("");
        setleaveReason("");
        setleaveDuration("");

        navigate(-1);

      } else {
        console.error('Failed to update post:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

        return (
          <>
          <EmptyNavArea />
          <main>
             <div className="max-w-md mx-auto">
             <h1 className="text-lg font-bold mb-3">Edit leave</h1>
                 <form className="needs-validation" noValidate>
                 
                             <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                 Leave Date
                                </label>
                                    <input
                                        type="date"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="Date"
                                        name="Date"
                                        value={leaveDate}
                                        onChange={(e) => setleaveDate(e.target.value)}
                                        placeholder="Enter Date"
                                    />
                                </div>
                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                Name
                                </label>
                                    <input
                                        type="text"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="text"
                                        name="text"
                                        value={leaveName}
                                        onChange={(e) => setleaveName(e.target.value)}
                                        placeholder="Enter Name"
                                    />
                                </div>
                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                Leave Type
                                </label>
                                    <input
                                        type="text"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="text"
                                        name="text"
                                        value={leaveType}
                                        onChange={(e) => setleaveType(e.target.value)}
                                        placeholder="Enter Leave Type"
                                    />
                                </div>
                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                Reason
                                </label>
                                    <input
                                        type="text"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="text"
                                        name="text"
                                        value={leaveReason}
                                        onChange={(e) => setleaveReason(e.target.value)}
                                        placeholder="Enter Reason"
                                    />
                                </div>
                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                Duration
                                </label>
                                    <input
                                        type="text"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="text"
                                        name="text"
                                        value={leaveDuration}
                                        onChange={(e) => setleaveDuration(e.target.value)}
                                        placeholder="Enter Leave Duration"
                                    />
                                </div>
                <div className="mb-6 text-center">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                  type="submit"
                  onClick={onSubmit}
                >
                  <i className="far fa-check-square"></i>
                  <span className="ml-2">Update</span>
                </button>
                </div>
              </form>
           </div>
     </main>
    </>
  );
};

export default EditLeave;
