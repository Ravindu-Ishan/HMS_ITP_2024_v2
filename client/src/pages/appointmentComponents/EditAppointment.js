import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TopNavAppointmet from '../../components/TopNavAppointment';

const EditAppointment = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [doctor, setDoctor] = useState("");
  const [status, setStatus] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [dateSchedule, setDateSchedule] = useState("");
  const [timeSchedule, setTimeSchedule] = useState("");
  const [phone, setPhone] = useState("");
  const [appointId, setAppointId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/appointment/${id}`);
        if (response.data.success) {
          const { topic, description, postCategory, status, doctor, dateOfBirth, age, dateSchedule, timeSchedule, phone, appointId } = response.data.appointment;
          setTopic(topic);
          setDescription(description);
          setPostCategory(postCategory);
          setStatus(status);
          setDoctor(doctor);
          setDateOfBirth(dateOfBirth);
          setAge(age);
          setDateSchedule(dateSchedule);
          setTimeSchedule(timeSchedule);
          setPhone(phone);
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
      case "postCategory":
        setPostCategory(value);
        break;
      case "status":
        setStatus(value);
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
      case "phone":
        setPhone(value);
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
        postCategory,
        doctor,
        status,
        dateOfBirth,
        age,
        dateSchedule,
        timeSchedule,
        phone,
        appointId
      };

      const response = await axios.put(`/appointment/update/${id}`, data);
      if (response.data.success) {
        alert("Appointment Updated Successfully");
        setTopic("");
        setDescription("");
        setPostCategory("");
        setStatus("");
        setDoctor("");
        setDateOfBirth("");
        setAge("");
        setDateSchedule("");
        setTimeSchedule("");
        setPhone("");
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
        <TopNavAppointmet />
      </div>

      <main>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-2xl font-bold mb-4  text-green-700'>Update Appointment</h1>
          <form className="needs-validation  bg-white sm:rounded-lg p-10" autoComplete='off' noValidate>

            <div className='mb-4'>
              <label ></label>
              <p className='text-m font-semibold text-black'>Appointment ID<span className='ml-6 mt-1 text-lg font-semibold'>{appointId}</span></p>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Patients' Name</label>
              <input
                type="text"
                className="form-control rounded-full p-2 text-gray-700"
                name="topic"
                placeholder="Enter Patients' Name"
                value={topic}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Patients' NIC</label>
              <input
                type="text"
                className="form-control rounded-full p-2 text-gray-700"
                name="description"
                placeholder="Enter Patients' NIC"
                maxLength={12}
                value={description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Contact No</label>
              <input
                type="text"
                className="form-control rounded-full p-2 text-gray-700"
                name="phone"
                placeholder="Enter Contact No"
                maxLength={10}
                value={phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Birth Date</label>
              <input
                type="date"
                className="form-control rounded-full p-2 text-gray-700"
                name="dateOfBirth"
                placeholder="Enter birth date"
                value={dateOfBirth}
                max={
                  new Date().toISOString().split('T')[0]
                }
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Patients' Age</label>
              <input
                type="text"
                className="form-control rounded-full p-2 text-gray-700"
                name="age"
                placeholder="Enter Patients' Age"
                maxLength={3}
                value={age}
                onChange={handleInputChange}
              />
            </div>


            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="specialization" style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Specailization</label>
              <select
                className="form-control rounded-full p-2 text-gray-700"
                id="specialization"
                name="postCategory"
                value={postCategory}
                onChange={handleInputChange}

              >
                {/* List of options for ward types */}
                <option value="">Select Category</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dentist">Dentist</option>
                <option value="General Physician">General Physician</option>

              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="doctor" style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Doctor/Specialist</label>
              <select
                className="form-control rounded-full p-2 text-gray-700"
                id="doctor"
                name="doctor"
                value={doctor}
                onChange={handleInputChange}

              >
                {/* List of options for ward types */}
                <option value="">Select Doctor/Specialist</option>
                <option value="Sunimala Sooriya Kasthuriarachchi">Dr Sunimala Sooriya Kasthuriarachchi</option>
                <option value="Rasuwan Kalhara Muraligoda">Dr Rasuwan Kalhara Muraligoda</option>
                <option value="Ruvindu Kurugoda Karunarathne">Dr Ruvindu Kurugoda Karunarathne</option>
                <option value="James Blunt">Dr James Blunt</option>
                <option value="Radrigara Hilmard Perera">Dr Radrigara Hilmard Perera</option>
                <option value="Sooriya Aachchige Nimeshini Dinethra">Dr Sooriya Aachchige Nimeshini Dinethra</option>

              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Schedule Date</label>
              <input
                type="date"
                className="form-control rounded-full p-2 text-gray-700"
                name="dateSchedule"
                placeholder="Select schedule date"
                value={dateSchedule}
                min={
                  new Date().toISOString().split('T')[0]
                }
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Schedule Time</label>
              <input
                type="time"
                className="form-control rounded-full p-2 text-gray-700"
                name="timeSchedule"
                placeholder="Select schedule time"
                value={timeSchedule}
                onChange={handleInputChange}
              />
            </div>


            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="status" style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Status</label>
              <select
                className="form-control rounded-full p-2 text-gray-700"
                id="status"
                name="status"
                value={status}
                onChange={handleInputChange}

              >
                {/* List of options for ward types */}
                <option value="">Select Status</option>

                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Cancle">Cancle</option>

              </select>
            </div>

            <button
              className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              type="submit"
              style={{ marginTop: '15px' }}
              onClick={onSubmit}
            >
              <i className="far fa-check-square"></i>
              &nbsp; Update
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default EditAppointment;
