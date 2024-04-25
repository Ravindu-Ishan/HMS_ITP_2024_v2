import axios from 'axios';
import { Component } from 'react';
//import React, {useState, useEffect} from 'react';

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
      phone: ""
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

    const { pname, nic, service, doctor, status, dateOfBirth, age, phone } = this.state;

    const data = {
      pname: pname,
      nic: nic,
      service: service,
      doctor: doctor,
      status: status,
      dateOfBirth: dateOfBirth,
      age: age,
      phone: phone
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
            phone: ""
          }
        )
      }
    })
  }

  render() {

    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Create new appointment</h1>
        <form className="needs-validation" autoComplete='off' noValidate>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Name</label>
            <input type="text"
              className="form-control"
              name="topic"
              placeholder="Enter Patient's Name"
              value={this.state.pname}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>NIC</label>
            <input type="text"
              className="form-control"
              name="description"
              placeholder="Enter Patient's NIC"
              value={this.state.nic}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Lab Test Type</label>
            <input type="text"
              className="form-control"
              name="labtestType"
              placeholder="Enter Lab Test Type"
              value={this.state.service}
              onChange={this.handleInputChange} />
          </div>          

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Contact No</label>
            <input type="text"
              className="form-control"
              name="phone"
              placeholder="Enter Contact No"
              maxLength={10}
              value={this.state.phone}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Birth Date</label>
            <input type="date"
              className="form-control"
              name="dateOfBirth"
              placeholder="Enter birth date"
              value={this.state.dateOfBirth}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Age</label>
            <input type="number"
              className="form-control"
              name="age"
              placeholder="Enter Age"
              maxLength={3}
              min="0"
              value={this.state.age}
              onChange={this.handleInputChange} />
          </div>


          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="doctor" style={{ marginBottom: '5px' }}>Doctor/Specialist</label>
            <select
              className="form-control"
              id="doctor"
              name="doctor"
              value={this.state.doctor}
              onChange={this.handleInputChange}
              
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


          <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; Save
          </button>

        </form>
      </div>
    );
  }
}
