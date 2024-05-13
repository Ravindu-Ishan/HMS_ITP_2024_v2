import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/labApp/${id}`);
        if (response.data.success) {
          const { pname, nic, service, status, doctor, dateOfBirth, age, phone } = response.data.labApp;
          setPname(pname);
          setNic(nic);
          setService(service);
          setStatus(status);
          setDoctor(doctor);
          setDateOfBirth(dateOfBirth);
          setAge(age);
          setPhone(phone);
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
        phone
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

      } else {
        console.error('Failed to update post:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Edit Appointment</h1>
      <form className="needs-validation" noValidate>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Name</label>
          <input
            type="text"
            className="form-control"
            name="pname"
            placeholder="Enter name"
            value={pname}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>NIC</label>
          <input
            type="text"
            className="form-control"
            name="nic"
            placeholder="Enter NIC"
            maxLength={12}
            value={nic}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Service</label>
          <input
            type="text"
            className="form-control"
            name="service"
            placeholder="Enter lab test type"
            value={service}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Contact No</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Enter Contact No"
            maxLength={10}
            value={phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Birth Date</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            placeholder="Enter birth date"
            value={dateOfBirth}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Age</label>
          <input
            type="text"
            className="form-control"
            name="age"
            placeholder="Enter age"
            maxLength={3}
            value={age}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
        <label htmlFor="doctor" style={{ marginBottom: '5px' }}>Doctor/Specialist</label>
        <select
            className="form-control"
            id="doctor"
            name="doctor"
            value={doctor}
            onChange={handleInputChange}
            
        >
            {/* List of options for ward types */}
            <option value="">Select Doctor/Specialist</option>
            <option value="No Doctor/Specialist">No Doctor/Specialist</option>
            <option value="DR AJANTHA TIKIRI RAJAPAKSHA">DR AJANTHA TIKIRI RAJAPAKSHA</option>
            <option value="DR ANIDU PATHIRANA">DR ANIDU PATHIRANA</option>
            <option value="DR CHAMARA RATHNAYAKE">DR CHAMARA RATHNAYAKE</option>
            <option value="DR HEMAL FERNANDO">DR HEMAL FERNANDO</option>
            <option value="DR MOHAN JAYATHILAKE">DR MOHAN JAYATHILAKE</option>
            <option value="DR M.RAYNO NAVINAN">DR M.RAYNO NAVINAN</option>
            <option value="DR R.A.U HASANTHA RANAWAKA">DR R.A.U HASANTHA RANAWAKA</option>
            <option value="DR SEPALIKA MENDIS">DR SEPALIKA MENDIS</option>
            <option value="DR STANLEY AMARASEKARA">DR STANLEY AMARASEKARA</option>
            <option value="DR W.S SANTHARAJ">DR W.S SANTHARAJ</option>
            <option value="DR WASANTHA KAPUWATTA">DR WASANTHA KAPUWATTA</option>
            <option value="DR NIMALI FERNANDO">DR NIMALI FERNANDO</option>
            <option value="PROF GODWIN .R. CONSTANTINE">PROF GODWIN .R. CONSTANTINE</option>
            <option value="DR R.A.U HASANTHA RANAWAKA">DR R.A.U HASANTHA RANAWAKA</option>
            <option value="DR MAHEN KOTHALAWALA">DR MAHEN KOTHALAWALA</option>
            <option value="DR HASANTHI NIROSHALA">DR HASANTHI NIROSHALA</option>
            <option value="DR CHANDRIKA J.SUBASINGHE">DR CHANDRIKA J.SUBASINGHE</option>
            <option value="DR DILUKA PINTO">DR DILUKA PINTO</option>
            
        </select>
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="status" style={{ marginBottom: '5px' }}>Status</label>
            <select
              className="form-control"
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
  );
};

export default EditAppointment;
