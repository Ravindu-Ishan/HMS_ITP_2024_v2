import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EmptyNavArea from "../components/EmptyNavArea";

const EditShift = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [Location, setLocation] = useState("");
  const [ScheduleTime, setTime] = useState("");
  const [ScheduleDate, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/shift/getbyID/${id}`);
        if (response.data.success) {
          const { ScheduleTime, ScheduleDate, Location } = response.data.post;
          setLocation(Location);
          setTime(ScheduleTime);
          setDate(ScheduleDate);
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
        Location,
        ScheduleTime,
        ScheduleDate
      };

      const response = await axios.put(`/shift/update/${id}`, data);
      if (response.data.success) {
        alert("Post Updated Successfully");

        setLocation("");
        setTime("");
        setDate("");

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
             <h1 className="text-lg font-bold mb-3">Edit shift</h1>
                 <form className="needs-validation" noValidate>
                 
                   <div className="mb-6">
                     <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                      Schedule Time
                      </label>
                       <input
                         id="schedule-time"
                         type="time"
                         className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                         name="Time"
                         placeholder="Enter Time"
                         value={ScheduleTime}
                         onChange={(e) => setTime(e.target.value)}
                      />
                 </div>
                    
                  <div className="mb-6">
                   <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                    Schedule Date
                    </label>
                     <input
                       id="schedule-date"
                       type="date"
                       className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                       name="Date"
                       placeholder="Enter Date"
                       value={ScheduleDate}
                       onChange={(e) => setDate(e.target.value)}
                     />
                   </div>

                   <div className="mb-6">
                   <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                    Location
                    </label>
                      <input
                        id="location"
                        type="text"
                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="RoomNumber"
                        placeholder="Enter RoomNumber"
                        value={Location}
                        onChange={(e) => setLocation(e.target.value)}
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

export default EditShift;
