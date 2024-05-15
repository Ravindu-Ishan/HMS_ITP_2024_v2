import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


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
    <main>
      <div id="print-content" style={{ maxWidth: '21cm', margin: 'auto', padding: '20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
  <h1 style={{ fontSize: '35px', fontWeight: 'bold', marginBottom: '10px' }}>Prescription Form</h1>
  <h2 style={{ fontSize: '18px' }}>
    <span style={{ fontWeight: 'bold' }}>MedFlow  Hospital</span>
  </h2>
</header>
<hr />

        <dl style={{ marginBottom: '20px' }}>
          <dt style={{ fontWeight: 'bold', width: '30%', display: 'inline-block' }}>Date:</dt>
          <dd style={{ marginLeft: '30%', display: 'inline-block' }}>{prescription.date}</dd>
        </dl>
        <div>
          <h4 style={{ marginTop: '20px', backgroundColor: '#f0f0f0', color: '#333', padding: '10px', borderRadius: '5px' }}>Prescriptions Info</h4>
          <div style={{ marginBottom: '20px' }}></div>
          <div>
            <dl>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <dt style={{ fontWeight: 'bold', width: '30%', marginRight: '10px' }}>Diagnosis:</dt>
                <dd style={{ width: '70%' }}>
                  {diagnosis.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div style={{ marginBottom: '20px' }}></div>
          <dl>
            <div style={{ display: 'flex' }}>
              <dt style={{ fontWeight: 'bold', width: '30%', marginRight: '10px' }}>Medications:</dt>
              <dd style={{ width: '70%' }}>
                {medications.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
        <button onClick={handlePrint} style={{ display: 'block', margin: '20px auto', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Print</button>
      </div>
    </main>
  );
};

export default PrescriptionsDetails;
