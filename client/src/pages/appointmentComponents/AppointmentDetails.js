import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  //to fetch the details
  useEffect(() => {
    axios.get(`/appointment/${id}`).then((res) => {
      if (res.data.success) {
        setAppointment(res.data.appointment);
        console.log(appointment);
      }
    });
  }, [id]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  const { topic, description, postCategory, status, doctor, dateOfBirth, age, dateSchedule, timeSchedule } = appointment;

  return (

    <div style={{marginTop: '20px'}}>

      <h2>{topic}</h2>

      <dl className="row">
        <dt className="col-sm-3">Patients' Name</dt>
        <dd className="col-sm-9">{topic}</dd>
        <dt className="col-sm-3">NIC</dt>
        <dd className="col-sm-9">{description}</dd>
        <dt className="col-sm-3">Category</dt>
        <dd className="col-sm-9">{postCategory}</dd>
        <dt className="col-sm-3">Birth Date</dt>
        <dd className="col-sm-9">{dateOfBirth}</dd>
        <dt className="col-sm-3">Age</dt>
        <dd className="col-sm-9">{age}</dd>
        <dt className="col-sm-3">Doctor/Specialist</dt>
        <dd className="col-sm-9">{doctor}</dd>
        <dt className="col-sm-3">Schedule Date</dt>
        <dd className="col-sm-9">{dateSchedule}</dd>
        <dt className="col-sm-3">Schedule Time</dt>
        <dd className="col-sm-9">{timeSchedule}</dd>
        <dt className="col-sm-3">Status</dt>
        <dd className="col-sm-9">{status}</dd>
      </dl>

      
    </div>
  );
};

export default AppointmentDetails;
