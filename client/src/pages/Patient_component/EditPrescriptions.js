
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

import TopNavPatientProfile from '../../components/TopNavPatientProfile';

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
                //navigate('/prescriptionsHome');
            } else {
                console.error('Failed to update prescription:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating prescription:', error);
        }
    };

    return (
    <>
        {/* top nav imported to this section */}
        <div className="navarea">
            <TopNavPatientProfile/>
        </div>
        <main>
        
        <div className="col-md-8 mt-4 mx-auto">
        <div className="text-xl ml-5 mb-5 font-bold text-gray-600">
        Update Prescriptions
                </div>
            <form className="needs-validation" noValidate onSubmit={onSubmit}>
                <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                            <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Date  :
                            </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="date"
                        className="form-control rounded-lg"
                        name="date"
                        placeholder="Date"
                        value={date}
                        onChange={handleInputChange}
                    />
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: "15px", width: "870px" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Diagnosis</label>
                    <textarea
                        className="form-textarea rounded-lg"
                        name="diagnosis"
                        rows="7" 
                        style={{ width: "100%", maxWidth: "100%" }}
                        placeholder="Description of diagnosis"
                        value={diagnosis}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: "15px", width: "870px" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold"}}>Medications</label>
                    <textarea
                        className="form-textarea rounded-lg"
                        name="medications"
                        rows="7" 
                        style={{ width: "100%", maxWidth: "100%" }}
                        placeholder="Description of medications"
                        value={medications}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex justify-center">
                <button 
                    className="bg-cyan-400 text-black rounded-full px-4 py-2 border-1 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500" 
                    type="submit" 
                    style={{ marginTop: "15px" }} 
                    onClick={onSubmit}
                >
                    <i className="far fa-check-square"></i>
                    &nbsp; Update Prescriptions
    </button>
    </div>

                {/*<button 
                    className="btn btn-success" 
                    type="submit" 
                    style={{ marginTop: "15px" }} 
                >
                    <i className="far fa-check-square"></i>
                    &nbsp; Update Prescription Details
    </button>*/}
            </form>
        </div>
        </main>
        </>
    );
};

export default EditPrescriptions;





{/*import React, { Component } from 'react';
import TopNavPatientProfile from '../../components/TopNavPatientProfile';


// Define the LabReports component
class EditPrescriptions extends Component {
  render() {
    return (
    <>*/}

        {/* top nav imported to this section */}
        {/*<div className="navarea">
          <TopNavPatientProfile/>
        </div>
      <div>
       
        
        <p>This is the Reports page.</p>
      </div>
      </>
    );
  }
}

// Export the LabReports component
export default EditPrescriptions;*/}













{/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

import TopNavPatientProfile from '../../components/TopNavPatientProfile';

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
                //navigate('/prescriptionsHome');
            } else {
                console.error('Failed to update prescription:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating prescription:', error);
        }
    };

    return (
    <>*/}
        {/* top nav imported to this section */}
        {/*<div className="navarea">
            <TopNavPatientProfile/>
        </div>
        <main>
        
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
        </main>
        </>
    );
};

export default EditPrescriptions;*/}






