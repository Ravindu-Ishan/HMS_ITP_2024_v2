import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//importing top navigation bar components
import TopNavPatient from '../../components/TopNavPatient';

const EditPatient = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState("");
    const [age, setAge] = useState("");
    const [postCategory, setPostCategory] = useState("");
    const [medicalhistory, setMedicalHistory] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/patient/${id}`);
                if (response.data.success) {
                    const { description, topic, age, postCategory, medicalhistory } = response.data.patient;
                    setDescription(description);
                    setTopic(topic);
                    setAge(age);
                    setPostCategory(postCategory);
                    setMedicalHistory(medicalhistory);
                } else {
                    console.error('Failed to fetch patient data:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching patient:', error);
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
            case "description":
                // Only allow letters
                if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
                    setDescription(value);
                }
                break;
            case "topic":
                // Allow only numbers for NIC
                if (/^[0-9]*$/.test(value) || value === "") {
                    setTopic(value);
                }
                break;
            case "age":
                // Allow only numbers for Age
                if (/^[0-9]*$/.test(value) || value === "") {
                    setAge(value);
                }
                break;
            case "postCategory":
                // Allow only numbers for Contact No
                if (/^[0-9]*$/.test(value) || value === "") {
                    setPostCategory(value);
                }
                break;
            case "medicalhistory":
                setMedicalHistory(value);
                break;
            default:
                break;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (!description || !topic || !age || !postCategory || !medicalhistory) {
            // Display error message
            alert("Please fill all fields");
            return;
        }

        try {
            const data = {
                description,
                topic,
                age,
                postCategory,
                medicalhistory,
            };

            const response = await axios.put(`/patient/update/${id}`, data);
            if (response.data.success) {
                alert("Patient Details Updated Successfully");
                setDescription("");
                setTopic("");
                setAge("");
                setPostCategory("");
                setMedicalHistory("");
                navigate('/patienthome');
            } else {
                console.error('Failed to update patient details:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating patient details:', error);
        }
    };

    return (
        <>
        {/* top nav imported to this section */}
        <div className="navarea">
            <TopNavPatient/>
        </div>
        <main>
        <div className="col-md-8 mt-4 mx-auto">
           
            <h1 className="h3 mb-3 font-weight-normal">Edit Patient's Details</h1>
            <form className="needs-validation" noValidate>
                <div className="form-group">
                    <label htmlFor="description">Patient's Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="Enter Patient's Name"
                        maxLength={50}
                        value={description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="topic">NIC</label>
                    <input
                        type="text"
                        className="form-control"
                        id="topic"
                        name="topic"
                        placeholder="Enter NIC No"
                        maxLength={12}
                        value={topic}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="text"
                        className="form-control"
                        id="age"
                        name="age"
                        placeholder="Enter Patient's Age"
                        maxLength={3}
                        value={age}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="postCategory">Contact No</label>
                    <input
                        type="text"
                        className="form-control"
                        id="postCategory"
                        name="postCategory"
                        placeholder="Enter Contact No"
                        maxLength={10}
                        value={postCategory}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="medicalhistory">Past Medical History</label>
                    <textarea
                        className="form-control"
                        id="medicalhistory"
                        name="medicalhistory"
                        rows="5"
                        style={{ width: "100%", maxWidth: "100%" }}
                        placeholder="Description of medical history"
                        value={medicalhistory}
                        onChange={handleInputChange}
                    />
                </div>

                <button 
                    className="btn btn-success" 
                    type="submit" 
                    style={{ marginTop: "15px" }} 
                    onClick={onSubmit}
                >
                    <i className="far fa-check-square"></i>
                    &nbsp; Update Patient's Details
                </button>
            </form>
              
        </div>
        </main>
        </>
        
    );
};

export default EditPatient;











