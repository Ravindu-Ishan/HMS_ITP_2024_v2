import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditPrescriptions = () => {
    const { id } = useParams();
    const [date, setDate] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [medications, setMedications] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/prescription/${id}`);
                if (response.data.success) {
                    const { date, diagnosis, medications } = response.data.prescription;
                    setDate(date);
                    setDiagnosis(diagnosis);
                    setMedications(medications);
                } else {
                    console.error('Failed to fetch prescription data:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching prescription:', error);
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
            case "date":
                setDate(value);
                break;
            case "diagnosis":
                setDiagnosis(value);
                break;
            case "medications":
                setMedications(value);
                break;
            default:
                break;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                date,
                diagnosis,
                medications
            };
            const response = await axios.put(`/prescription/update/${id}`, data);
            if (response.data.success) {
                alert("Prescription Updated Successfully");
                setDate("");
                setDiagnosis("");
                setMedications("");
            } else {
                console.error('Failed to update prescription:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating prescription:', error);
        }
    };

    return (
        <div className="col-md-8 mt-4 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal">Edit Prescription Details</h1>
            <form className="needs-validation" noValidate onSubmit={onSubmit}>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        placeholder="Date"
                        value={date}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: "15px", width: "870px" }}>
                    <label style={{ marginBottom: "5px" }}>Diagnosis</label>
                    <textarea
                        className="form-control"
                        name="diagnosis"
                        rows="5" 
                        style={{ width: "100%", maxWidth: "100%" }}
                        placeholder="Description of diagnosis"
                        value={diagnosis}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: "15px", width: "870px" }}>
                    <label style={{ marginBottom: "5px" }}>Medications</label>
                    <textarea
                        className="form-control"
                        name="medications"
                        rows="5" 
                        style={{ width: "100%", maxWidth: "100%" }}
                        placeholder="Description of medications"
                        value={medications}
                        onChange={handleInputChange}
                    />
                </div>

                <button 
                    className="btn btn-success" 
                    type="submit" 
                    style={{ marginTop: "15px" }} 
                >
                    <i className="far fa-check-square"></i>
                    &nbsp; Update Prescription Details
                </button>
            </form>
        </div>
    );
};

export default EditPrescriptions;



