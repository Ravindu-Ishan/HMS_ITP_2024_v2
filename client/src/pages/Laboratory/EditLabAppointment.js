import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditLabAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient_ID, setpatient_ID] = useState("");
  const [patient_name, setpatient_name] = useState("");
  const [test_ID, settest_ID] = useState("");
  const [doctor_info, setdoctor_info] = useState("");
  const [test_type, settest_type] = useState("");
  const [test_description, settest_description] = useState("");
  const [test_date, settest_date] = useState("");
  const [test_time, settest_time] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/laboratory/${id}`);
        if (response.data.success) {
          const { patient_ID, patient_name, test_ID, doctor_info, test_type, test_description, test_date, test_time } = response.data.data;
          setpatient_ID(patient_ID);
          setpatient_name(patient_name);
          settest_ID(test_ID);
          setdoctor_info(doctor_info);
          settest_type(test_type);
          settest_description(test_description);
          settest_date(test_date);
          settest_time(test_time);
        } else {
          console.error('Failed to fetch laboratory data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching laboratory appointment:', error);
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
      case "patient_ID":
        setpatient_ID(value);
        break;
      case "patient_name":
        setpatient_name(value);
        break;
      case "test_ID":
        settest_ID(value);
        break;
      case "doctor_info":
        setdoctor_info(value);
        break;
      case "test_type":
        settest_type(value);
        break;
      case "test_description":
        settest_description(value);
        break;
      case "test_date":
        settest_date(value);
        break;
      case "test_time":
        settest_time(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        patient_ID,
        patient_name,
        test_ID,
        doctor_info,
        test_type,
        test_description,
        test_date,
        test_time
      };

      const response = await axios.put(`/laboratory/update/${id}`, data);
      if (response.data.success) {
        alert("Laboratory appointment updated successfully");
        setpatient_ID("");
        setpatient_name("");
        settest_ID("");
        setdoctor_info("");
        settest_type("");
        settest_description("");
        settest_date("");
        settest_time("");
        navigate('/laboratory');
      } else {
        console.error('Failed to update laboratory:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating laboratory:', error);
    }
  };

  // Get current date and time
  const currentDate = new Date().toISOString().slice(0, 16);
  
  return (

    <div className="mx-auto max-w-md p-8">
      <h1 className="text-2xl mb-4 font-bold">Edit Lab Test Appointment</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block mb-1">Patient ID</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded border"
            name="patient_ID"
            placeholder="Enter Patient ID"
            value={patient_ID}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block mb-1">Patient Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded border"
            name="patient_name"
            placeholder="Enter Patient Name"
            value={patient_name}
            onChange={handleInputChange}
          />
          </div>

          <div>
          <label className="block mb-1">Test ID</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded border"
            name="test_ID"
            placeholder="Enter Test ID"
            value={test_ID}
            onChange={handleInputChange}
          />
          </div>

        <div>
        <label className="block mb-1">Doctor Information</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded border"
          name="doctor_info"
          placeholder="Enter Doctor Information"
          value={doctor_info}
          onChange={handleInputChange}
        />
        </div>

<div>
  <label className="block mb-1">Test Type</label>
  <input
    type="text"
    className="w-full px-4 py-2 rounded border"
    name="test_type"
    placeholder="Enter Test Type"
    value={test_type}
    onChange={handleInputChange}
  />
</div>

<div>
  <label className="block mb-1">Test Description</label>
  <input
    type="text"
    className="w-full px-4 py-2 rounded border"
    name="test_description"
    placeholder="Enter Test Description"
    value={test_description}
    onChange={handleInputChange}
  />
</div>

<div>
  <label className="block mb-1">Test Date</label>
  <input
    type="datetime-local"
    className="w-full px-4 py-2 rounded border"
    name="test_date"
    value={test_date}
    min={currentDate} 
    onChange={handleInputChange}
  />
</div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditLabAppointment;
