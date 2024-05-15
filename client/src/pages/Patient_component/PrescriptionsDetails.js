import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactToPrint from "react-to-print";
import TopNavPatientProfile from '../../components/TopNavPatientProfile';
//import images
import brandLogo from "../../images/brandLogo.png"



const PrescriptionsDetails = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [showInvoice, setShowInvoice] = useState(true);

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


  const componentRef = useRef()

  const handlePrint = () => {
    window.print()
  }

  if (!prescription) {
    return <div>Loading...</div>;
  }

  const { date, diagnosis, medications } = prescription;

  return (

    <>
      {/* Top navigation bar */}
      <div className="navarea">
        <TopNavPatientProfile />
      </div>
      <main>
        <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">

          {showInvoice ? (
            <>

              <ReactToPrint trigger={() => <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Print / Download</button>}

                content={() => componentRef.current} />

              <div ref={componentRef} className="p-7">
              <header>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  
                  <div>
                    <h1 style={{ fontSize: '35px', fontWeight: 'bold', marginBottom: '10px' }}>Prescription Form</h1>
                    <></><div className="sidebar-brand inline-flex">
                    <img src={brandLogo} alt="brand logo" width={60} className="mr-2" />
                    <div className="mt-2">MedFlow</div>
                  </div>
                  </div>
                </div>
              </header>
              <hr />


                {/* <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h1 style={{ fontSize: '35px', fontWeight: 'bold', marginBottom: '10px' }}>Prescription Form</h1>
                 
                  <h2 style={{ fontSize: '18px' }}>
                    <span style={{ fontWeight: 'bold' }}>MedFlow  Hospital</span>
                  </h2>
                </header>
                <hr /> */}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                  <dt style={{ fontWeight: 'bold' }}>Date:</dt>
                  <dd style={{ marginLeft: '10px' }}>{new Date(prescription.date).toLocaleDateString()}</dd>
                </div>


                <div>
                  <h4 style={{ marginTop: '20px', backgroundColor: '#ADD8E6', color: '#333', padding: '10px', borderRadius: '5px' }}>Prescriptions Info</h4>

                  <div style={{ marginBottom: '20px' }}></div>
                  <div>
                    <dl>
                      <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <dt style={{ fontWeight: 'bold', width: '30%', marginRight: '10px' }}>Diagnosis    :</dt>
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
                      <dt style={{ fontWeight: 'bold', width: '30%', marginRight: '10px' }}>Medications    :</dt>
                      <dd style={{ width: '70%' }}>
                        {medications.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </dd>
                    </div>
                  </dl>

                </div>

              </div>
            </>
          ) : (
            <>
             <div className="flex flex-col justify-center">
             <button onClick={() => setShowInvoice(true)}
                className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Preview Invoice</button>

            </div>
            </>
          )}

  
          
        </main>
      </main>
    </>
  );
}

export default PrescriptionsDetails;
