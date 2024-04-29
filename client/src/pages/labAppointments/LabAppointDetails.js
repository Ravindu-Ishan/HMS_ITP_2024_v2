import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AppointmentDetails = () => {
  const { id } = useParams();
  const [labApp, setLabApp] = useState(null);

  //to fetch the details
  useEffect(() => {
    axios.get(`/labApp/${id}`).then((res) => {
      if (res.data.success) {
        setLabApp(res.data.labApp);
        console.log(labApp);
      }
    });
  }, [id]);

  if (!labApp) {
    return <div>Loading...</div>;
  }

  const { pname, nic, service, status, doctor, dateOfBirth, age, phone } = labApp;

  return (
<>
<main>

    <div style={{marginTop: '20px'}}>

      <h2>{pname}</h2>

      <dl className="row">
        <dt className="col-sm-3">Patients' Name</dt>
        <dd className="col-sm-9">{pname}</dd>
        <dt className="col-sm-3">NIC</dt>
        <dd className="col-sm-9">{nic}</dd>
        <dt className="col-sm-3">Category</dt>
        <dd className="col-sm-9">{service}</dd>
        <dt className="col-sm-3">Birth Date</dt>
        <dd className="col-sm-9">{dateOfBirth}</dd>
        <dt className="col-sm-3">Age</dt>
        <dd className="col-sm-9">{age}</dd>
        <dt className="col-sm-3">Doctor/Specialist</dt>
        <dd className="col-sm-9">{doctor}</dd>
        <dt className="col-sm-3">Contact no</dt>
        <dd className="col-sm-9">{phone}</dd>
        <dt className="col-sm-3">Status</dt>
        <dd className="col-sm-9">{status}</dd>
      </dl>

      
    </div>

    </main>
</>
  );
};

export default AppointmentDetails;
