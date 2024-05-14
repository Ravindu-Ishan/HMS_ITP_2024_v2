import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import TopNavPatientProfile from '../../components/TopNavPatientProfile';

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
    <>

      {/* top nav imported to this section */}
      <div className="navarea">
        <TopNavPatientProfile/>
      </div>
      <main>
      <div className="bg-white border border-gray-200 rounded-[50px] shadow-lg p-10 m-5">
      <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-center">
    <div className="text-center"> 
        <h1 className="font-bold uppercase tracking-wide text-4xl mb-3">Prescription Form</h1>
        <h1 className="font-bold text-lg">MedFlow Hospital</h1>
        
    </div>
    
</header>
<hr />



      <dl className="row">
        {/*<dt className="col-sm-3">Patient's Name</dt>
        <dd className="col-sm-9">{post.description}</dd>

        <dt className="col-sm-3">Age</dt>
  <dd className="col-sm-9">{post.age}</dd>*/}
  

        <dt className=" font-bold col-sm-3">Date  :</dt>
        <dd className="col-sm-9">{prescription.date}</dd>
      </dl>

      <div>
      
      <h4 style={{ marginTop: '80px', backgroundColor: '#f0f0f0', color: '#333', padding: '10px', borderRadius: '5px' }}>Prescriptions Info</h4>

        
        <div style={{ marginBottom: '20px' }}></div> {/* Add empty div to create space */}


        
                
                <div>
                        
                      
                        <dl className="row">
    <div className="row">
        <dt className="font-bold col-sm-3">Diagnosis  :</dt>
        <dd className="col-sm-9">
            {diagnosis.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </dd>
    </div>
  
</dl>
</div>

<div style={{ marginBottom: '20px' }}></div> {/* Add empty div to create space */}

<dl className="row">
    <div className="row">
        <dt className="font-bold col-sm-3">Medications  :</dt>
        <dd className="col-sm-9">
            {medications.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </dd>
    </div>
</dl>

      </div>
      </div>
    
    </main>
    </>
  );
};

export default PrescriptionsDetails;



