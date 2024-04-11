import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


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
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Edit shift</h1>
      <form className="needs-validation" noValidate>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Schedule Time</label>
          <input
            type="time"
            className="form-control"
            name="Time"
            placeholder="Enter Time"
            value={ScheduleTime}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Schedule Date</label>
          <input
            type="date"
            className="form-control"
            name="Date"
            placeholder="Enter Date"
            value={ScheduleDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Location</label>
          <input
            type="text"
            className="form-control"
            name="RoomNumber"
            placeholder="Enter RoomNumber"
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
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
