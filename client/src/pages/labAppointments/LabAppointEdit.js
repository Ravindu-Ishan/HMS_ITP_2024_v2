import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TopNavAppointmet from '../../components/TopNavAppointment';

const EditAppointment = () => {
  const { id } = useParams();
  const [pname, setPname] = useState("");
  const [nic, setNic] = useState("");
  const [service, setService] = useState("");
  const [doctor, setDoctor] = useState("");
  const [status, setStatus] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [labAppId, setLabAppId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/labApp/${id}`);
        if (response.data.success) {
          const { pname, nic, service, status, doctor, dateOfBirth, age, phone, labAppId } = response.data.labApp;
          setPname(pname);
          setNic(nic);
          setService(service);
          setStatus(status);
          setDoctor(doctor);
          setDateOfBirth(dateOfBirth);
          setAge(age);
          setPhone(phone);
          setLabAppId(labAppId);
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
      case "pname":
        setPname(value);
        break;
      case "nic":
        setNic(value);
        break;
      case "service":
        setService(value);
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
      case "phone":
        setPhone(value);
        break;
      case "labAppId":
        setLabAppId(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        pname,
        nic,
        service,
        doctor,
        status,
        dateOfBirth,
        age,
        phone,
        labAppId
      };

      const response = await axios.put(`/labApp/update/${id}`, data);
      if (response.data.success) {
        alert("Appointment Updated Successfully");
        setPname("");
        setNic("");
        setService("");
        setStatus("");
        setDoctor("");
        setDateOfBirth("");
        setAge("");
        setPhone("");
        setLabAppId("");

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
              <p className='text-m font-semibold text-black'>Appointment ID<span className='ml-6 mt-1 text-lg font-semibold'>{labAppId}</span></p>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Patients' Name</label>
              <input
                type="text"
                className="form-control  rounded-full p-2 text-gray-700"
                name="pname"
                placeholder="Enter name"
                value={pname}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Patients' NIC</label>
              <input
                type="text"
                className="form-control rounded-full p-2 text-gray-700"
                name="nic"
                placeholder="Enter NIC"
                maxLength={12}
                value={nic}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Service</label>
              <input
                type="text"
                className="form-control rounded-full p-2 text-gray-700"
                name="service"
                placeholder="Enter lab test type"
                value={service}
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
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px', marginRight: '12px', fontWeight: '600' }}>Patients' Age</label>
              <input
                type="text"
                className="form-control rounded-full p-2 text-gray-700"
                name="age"
                placeholder="Enter age"
                maxLength={3}
                value={age}
                onChange={handleInputChange}
              />
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
                <option value="No Doctor/Specialist">No Doctor/Specialist</option>
                <option value="James Blunt">Dr James Blunt</option>
                <option value="Radrigara Hilmard Perera">Dr Radrigara Hilmard Perera</option>
                <option value="Sooriya Aachchige Nimeshini Dinethra">Dr Sooriya Aachchige Nimeshini Dinethra</option>
                <option value="Sunimala Sooriya Kasthuriarachchi">Dr Sunimala Sooriya Kasthuriarachchi</option>
                <option value="Rasuwan Kalhara Muraligoda">Dr Rasuwan Kalhara Muraligoda</option>
                <option value="Ruvindu Kurugoda Karunarathne">Dr Ruvindu Kurugoda Karunarathne</option>
              </select>
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
