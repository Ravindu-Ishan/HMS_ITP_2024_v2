import axios from 'axios';
import { Component } from 'react';
//import React, {useState, useEffect} from 'react';
import TopNavAppointmet from '../../components/TopNavAppointment';

export default class LabAppointHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pname: "",
      nic: "",
      service: "",
      doctor: "",
      status: "",
      dateOfBirth: "",
      age: "",
      phone: "",
      labAppId: ""
    };
  }


  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    alert("Appointment Successfully Created");

    const { pname, nic, service, doctor, status, dateOfBirth, age, phone, labAppId } = this.state;

    const data = {
      pname: pname,
      nic: nic,
      service: service,
      doctor: doctor,
      status: status,
      dateOfBirth: dateOfBirth,
      age: age,
      phone: phone,
      labAppId: labAppId
    };

    console.log(data);

    axios.post("/labApp/save", data).then((res) =>{
      if(res.data.success){
        this.setState(
          {
            pname:"",
            nic:"",
            service:"",
            doctor: "",
            status: "",
            dateOfBirth: "",
            age: "",
            phone: "",
            labAppId: ""
          }
        )
      }
    })
  }

  render() {

    return (
      <>

        <div className='navarea'>
          <TopNavAppointmet/>
        </div>
      <main>

      <div className='max-w-3xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4  text-green-700'>Create New Lab Appointment</h1>
        <form className="needs-validation bg-white sm:rounded-lg p-10" autoComplete='off' noValidate>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', marginRight: '12px' , fontWeight: '600'}}>Appointment ID</label>
            <input type="text"
              className="form-control rounded-full p-2 text-gray-500"
              name="labAppId"
              placeholder="Enter Appointment ID"
              value={this.state.labAppId}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', marginRight: '12px' , fontWeight: '600'}}>Patients' Name</label>
            <input type="text"
              className="form-control rounded-full p-2 text-gray-500"
              style={{ width: '300px'}}
              name="pname"
              placeholder="Enter Patient's Name"
              value={this.state.pname}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', marginRight: '12px' , fontWeight: '600'}}>Patients' NIC</label>
            <input type="text"
              className="form-control rounded-full p-2 text-gray-500"
              name="nic"
              placeholder="Enter Patient's NIC"
              value={this.state.nic}
              maxLength={12}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', marginRight: '12px' , fontWeight: '600'}}>Lab Test Type</label>
            <input type="text"
              className="form-control rounded-full p-2 text-gray-500"
              name="service"
              placeholder="Enter Lab Test Type"
              value={this.state.service}
              onChange={this.handleInputChange} />
          </div>          

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', marginRight: '12px' , fontWeight: '600'}}>Contact No</label>
            <input type="text"
              className="form-control rounded-full p-2 text-gray-500"
              name="phone"
              placeholder="Enter Contact No"
              maxLength={10}
              value={this.state.phone}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', marginRight: '12px' , fontWeight: '600'}}>Birth Date</label>
            <input type="date"
              className="form-control rounded-full p-2 text-gray-500"
              name="dateOfBirth"
              placeholder="Enter birth date"
              max={
                new Date().toISOString().split('T')[0]
               }
              value={this.state.dateOfBirth}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', marginRight: '12px' , fontWeight: '600'}}>Patients' Age</label>
            <input type="number"
              className="form-control rounded-full p-2 text-gray-500"
              name="age"
              placeholder="Enter Age"
              maxLength={3}
              min="0"
              value={this.state.age}
              onChange={this.handleInputChange} />
          </div>


          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="doctor" style={{ marginBottom: '5px', marginRight: '12px' , fontWeight: '600'}}>Doctor/Specialist</label>
            <select
              className="form-control rounded-full p-2 text-gray-500"
              id="doctor"
              name="doctor"
              value={this.state.doctor}
              onChange={this.handleInputChange}
              
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
            <label htmlFor="status" style={{ marginBottom: '5px', marginRight: '12px' , fontWeight: '600'}}>Status</label>
            <select
              className="form-control rounded-full p-2 text-gray-500"
              id="status"
              name="status"
              value={this.state.status}
              onChange={this.handleInputChange}
              
            >
              {/* List of options for ward types */}
              <option value="">Select Status</option>
              
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Cancle">Cancle</option>
              
            </select>
          </div>


          <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; Save
          </button>

          <button className="text-white bg-green-700 hover:bg-green-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit" style={{ marginTop: '15px' }}>
            <i className="far fa-check-square"></i>
            &nbsp; Proceed Payment
          </button>

        
        </form>
      </div>

      </main>
      </>
    );
  }
}
