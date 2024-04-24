import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PatientNavBar from './PatientNavBar';

const PrescriptionsDetails = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/prescription/${id}`);
        if (response.data.success) {
          setPrescription(response.data.prescription);
        }
      } catch (error) {
        console.error('Error fetching prescription:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!prescription) {
    return <div>Loading...</div>;
  }

  const { date, diagnosis, medications } = prescription;

  return (
    <div style={{ marginTop: '20px' }}>
      <PatientNavBar />
      <h4>Patient's Info</h4>
      <hr />
      <dl className="row">
        {/*<dt className="col-sm-3">Patient's Name</dt>
        <dd className="col-sm-9">{post.description}</dd>

        <dt className="col-sm-3">Age</dt>
  <dd className="col-sm-9">{post.age}</dd>*/}

        <dt className="col-sm-3">Date</dt>
        <dd className="col-sm-9">{prescription.date}</dd>
      </dl>

      <div>
        <h4 style={{ marginTop: '80px' }}>Prescriptions Info</h4>
        <hr />
        <dl className="row">
          <div className="row">
            <dt className="col-sm-3">Diagnosis</dt>
            <dd className="col-sm-9">
              {diagnosis.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </dd>
          </div>
        </dl>

        <dl className="row">
          <div className="row">
            <dt className="col-sm-3">Medications</dt>
            <dd className="col-sm-9">
              {medications.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PrescriptionsDetails;



{/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PatientNavBar from './PatientNavBar';

const PrescriptionsDetails = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/prescription/${id}`);
        if (response.data.success) {
          setPrescription(response.data.prescription);
        }
      } catch (error) {
        console.error('Error fetching prescription:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!prescription) {
    return <div>Loading...</div>;
  }

  const { date, diagnosis, medications } = prescription;

  return (
    <div style={{ marginTop: '20px' }}>
      <PatientNavBar />
      <h4>Patient's Info</h4>
      <hr />
      <dl className="row">
        <dt className="col-sm-3">Date</dt>
        <dd className="col-sm-9">{prescription.date}</dd>
      </dl>

      <div>
        <h4 style={{ marginTop: '80px' }}>Prescriptions Info</h4>
        <hr />
        <dl className="row">
          <div className="row">
            <dt className="col-sm-3">Diagnosis</dt>
            <dd className="col-sm-9">
              {diagnosis.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </dd>
          </div>
        </dl>

        <dl className="row">
          <div className="row">
            <dt className="col-sm-3">Medications</dt>
            <dd className="col-sm-9">
              {medications.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </dd>
          </div>
        </dl>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={handlePrint} className="btn btn-success" style={{ marginTop: '20px' }}>Print</button>
      </div>  
    </div>
  );
};

export default PrescriptionsDetails;*/}



