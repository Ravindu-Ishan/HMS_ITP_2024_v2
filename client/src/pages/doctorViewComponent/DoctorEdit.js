import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TopNavAppointmet from '../../components/TopNavAppointment';

const EditAppointment = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  
  const [doctor, setDoctor] = useState("");
  
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [dateSchedule, setDateSchedule] = useState("");
  const [timeSchedule, setTimeSchedule] = useState("");
  const [appointId, setAppointId] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/appointment/${id}`);
        if (response.data.success) {
          const { topic, description, doctor, dateOfBirth, age, dateSchedule, timeSchedule, appointId } = response.data.appointment;
          setTopic(topic);
          setDescription(description);
          setDoctor(doctor);
          setDateOfBirth(dateOfBirth);
          setAge(age);
          setDateSchedule(dateSchedule);
          setTimeSchedule(timeSchedule);
          setAppointId(appointId);
          
        } else {
          console.error('Failed to fetch post data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
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
      case "topic":
        setTopic(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "doctor":
        setDoctor(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      case "age":
        setAge(value);
        break;
      case "dateSchedule":
        setDateSchedule(value);
        break;
      case "timeSchedule":
        setTimeSchedule(value);
        break;
      case "appointId":
        setAppointId(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        topic,
        description,
        
        doctor,
       
        dateOfBirth,
        age,
        dateSchedule,
        timeSchedule,
        appointId
       
      };

      const response = await axios.put(`/appointment/update/${id}`, data);
      if (response.data.success) {
        alert("Appointment Updated Successfully");
        setTopic("");
        setDescription("");
       
       
        setDoctor("");
        setDateOfBirth("");
        setAge("");
        setDateSchedule("");
        setTimeSchedule("");
        setAppointId("");
      

      } else {
        console.error('Failed to update post:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (

      <>

      <div className='navarea'>
        <TopNavAppointmet/>
      </div>

      <main>
        <div className='max-w-3xl mx-auto'>
          <h1 className="text-2xl mb-4">Reschedule Appointment</h1>
          <form className="needs-validation" noValidate>
  
          <h2 className='text-xl font-bold mb-4'>{topic}</h2>
  
          <dl className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8'>
            <div className='mb-4'>
              <dt className='text-sm font-medium text-gray-500'>Appointment ID</dt>
              <dd className='mt-1 text-lg font-semibold'>{appointId}</dd>
            </div>
            <div className='mb-4'>
              <dt className='text-sm font-medium text-gray-500'>Patients' Name</dt>
              <dd className='mt-1 text-lg font-semibold'>{topic}</dd>
            </div>
            <div className='mb-4'>
              <dt className='text-sm font-medium text-gray-500'>NIC</dt>
              <dd className='mt-1 text-lg font-semibold'>{description}</dd>
            </div>
            <div className='mb-4'>
              <dt className='text-sm font-medium text-gray-500'>Birth Date</dt>
              <dd className='mt-1 text-lg font-semibold'>{dateOfBirth}</dd>
            </div>
            <div className='mb-4'>
              <dt className='text-sm font-medium text-gray-500'>Age</dt>
              <dd className='mt-1 text-lg font-semibold'>{age}</dd>
            </div>
            {/* <div className='mb-4'>
              <dt className='text-sm font-medium text-gray-500'>Doctor/Specialist</dt>
              <dd className='mt-1 text-lg font-semibold'>{doctor}</dd>
            </div> */}

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label className="font-bold" style={{ marginBottom: '5px' }}>Schedule Date</label>
              <input
                type="date"
                className="form-control"
                name="dateSchedule"
                placeholder="Select schedule date"
                value={dateSchedule}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label className="font-bold" style={{ marginBottom: '5px' }}>Schedule Time</label>
              <input
                type="time"
                className="form-control"
                name="timeSchedule"
                placeholder="Select schedule time"
                value={timeSchedule}
                onChange={handleInputChange}
              />
            </div>


            <button
              className="text-white bg-green-700 hover:bg-green-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              type="submit"
              style={{ marginTop: '15px' }}
              onClick={onSubmit}
            >
              <i className="far fa-check-square"></i>
              &nbsp; Update
            </button>

            
            </dl>
          </form>
        </div>
      </main>
    </>
  );
};

export default EditAppointment;
