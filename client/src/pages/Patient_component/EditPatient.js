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
           
        <div className="text-xl ml-5 mb-5 font-bold text-gray-600">
                Basic Patient Info
                </div>
            {/*<form className="needs-validation" noValidate>*/}
            <form class="w-full max-w-sm">
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Patient's Name  :
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
       type="text"
        id="description"
        name="description"
        placeholder="Enter Patient's Name"
        maxLength={50}
        value={description}
        onChange={handleInputChange}
        style={{ width: '500px' }} // Adjust the width as needed
        />
    </div>
  </div>

  <div class="md:flex md:items-center mb-6">
  <div class="md:w-1/3">
    <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
      NIC  :
    </label>
  </div>
  <div class="md:w-2/3">
    <input 
      class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      type="text"
      id="topic"
      name="topic"
      placeholder="Enter NIC No"
      maxLength={50}
      value={topic}
      onChange={handleInputChange}
      style={{ width: '500px' }} // Adjust the width as needed
    />
  </div>
</div>

  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Age  :
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
       type="text"
        id="age"
        name="age"
        placeholder="Enter Patient's Age"
        maxLength={50}
        value={age}
        onChange={handleInputChange}
        style={{ width: '500px' }} // Adjust the width as needed
        />
    </div>
  </div>
  

  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Contact No  :
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
       type="text"
        id="postCategory"
        name="postCategory"
        placeholder="Enter Contact No"
        maxLength={50}
        value={postCategory}
        onChange={handleInputChange}
        style={{ width: '500px' }} // Adjust the width as needed
        />
    </div>
  </div>

  
    </form>

                <form className="needs-validation" noValidate>

                <div className="form-group">
                <div className="text-xl ml-5 mb-5 font-bold text-gray-600">
                Medical History
                </div>
                
                    <textarea
                        className="form-control rounded-lg"
                        id="medicalhistory"
                        name="medicalhistory"
                        rows="10"
                        style={{ width: "1000px", maxWidth: "100%", textAlign: "center" }}
                        placeholder="Description of medical history"
                        value={medicalhistory}
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
                    &nbsp; Update Patient's Details
    </button>
    </div>
            </form>
              
        </div>
        </main>
        </>
        
    );
};

export default EditPatient;











