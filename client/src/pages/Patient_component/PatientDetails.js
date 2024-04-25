import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PatientNavBar from './PatientNavBar';

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/patient/${id}`);
                if (response.data.success) {
                    setPatient(response.data.patient);
                }
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    const { description, topic, age, postCategory, medicalhistory } = patient;
    const imageUrl = 'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg';

    return (
        <div style={{ marginTop: '20px' }}>
            <PatientNavBar />
            
            <div className="row">
                <div className="col-sm-3" style={{textAlign: 'left'}}>
                    <img src={imageUrl} alt="Patient" style={{ width: '100%', maxHeight: '400px' }} />
                </div>
                <div className="col-sm-9">
                    <h4>Basic Patient Info</h4>
                    <hr/>
                    <dl className="row">
                        <dt className="col-sm-3">Patient's Name</dt>
                        <dd className="col-sm-9">{description}</dd>

                        <dt className="col-sm-3">NIC</dt>
                        <dd className="col-sm-9">{topic}</dd>

                        <dt className="col-sm-3">Age</dt>
                        <dd className="col-sm-9">{age}</dd>

                        <dt className="col-sm-3">Contact No</dt>
                        <dd className="col-sm-9">{postCategory}</dd>
                    </dl>

                    <div>
                        <h4 style={{ marginTop: '80px' }}>Past Medical Info</h4>
                        <hr />
                        <dl className="row">
                            <div className="row">
                                <dt className="col-sm-3">Medical History</dt>
                                <dd className="col-sm-9">
                                    {medicalhistory.split('\n').map((line, index) => (
                                        <div key={index}>{line}</div>
                                    ))}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;




