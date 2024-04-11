import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditShift = () => {
  const { id } = useParams();
  
  const [RoomNumber, setRoomNumber] = useState("");
  const [Time, setTime] = useState("");
  const [Date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/shift/${id}`);
        if (response.data.success) {
          const { ScheduleTime, ScheduleDate, RoomNumber } = response.data.post;
          
          setRoomNumber(RoomNumber);
          setTime(Time);
          setDate(Date);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      
      case "RoomNumber":
        setRoomNumber(value);
        break;
      case "Time":
        setTime(value);
        break;
      case "Date":
        setDate(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        
        RoomNumber,
        Time,
        Date
      };

      const response = await axios.put(`/shift/update/${id}`, data);
      if (response.data.success) {
        alert("Post Updated Successfully");
        setRoomNumber("");
        setTime("");
        setDate("");
      } else {
        console.error('Failed to update post:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Edit shift</h1>
      <form className="needs-validation" noValidate>
          <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Schedule Time</label>
          <input
            type="text"
            className="form-control"
            name="Time"
            placeholder="Enter Time"
            value={Time}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Schedule Date</label>
          <input
            type="text"
            className="form-control"
            name="Date"
            placeholder="Enter Date"
            value={Date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Room Number</label>
          <input
            type="text"
            className="form-control"
            name="RoomNumber"
            placeholder="Enter RoomNumber"
            value={RoomNumber}
            onChange={handleInputChange}
          />
        </div>
        
        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: '15px' }}
          onClick={onSubmit}
        >
          <i className="far fa-check-square"></i>
          &nbsp; Update
        </button>
      </form>
    </div>
  );
};

export default EditShift;
