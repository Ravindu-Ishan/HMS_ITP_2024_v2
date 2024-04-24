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

  const { topic, description, dateOfBirth, age } = appointment;

  return (

    <div style={{marginTop: '20px'}}>

    <button className="btn btn-success"><a href="#" style={{textDecoration:'none', color:'white'}}>Patient History</a></button>
            
    <h1>Doctor</h1>
      <h2>{topic}</h2>

      <dl className="row">
        <dt className="col-sm-3">Patients' Name</dt>
        <dd className="col-sm-9">{topic}</dd>
        <dt className="col-sm-3">NIC</dt>
        <dd className="col-sm-9">{description}</dd>
        <dt className="col-sm-3">Birth Date</dt>
        <dd className="col-sm-9">{dateOfBirth}</dd>
        <dt className="col-sm-3">Age</dt>
        <dd className="col-sm-9">{age}</dd>
      </dl>
   
    </div>
  );
};

export default AppointmentDetails;
