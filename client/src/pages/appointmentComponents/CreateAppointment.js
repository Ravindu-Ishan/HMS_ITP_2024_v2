import axios from 'axios';
import { Component } from 'react';
//import React, {useState, useEffect} from 'react';
import TopNavAppointmet from '../../components/TopNavAppointment';

export default class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      description: "",
      postCategory: "",
      doctor: "",
      status: "",
      dateOfBirth: "",
      age: "",
      timeSchedule: "",
      dateSchedule: "",
      phone: "",
      appointId: ""
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

    const { topic, description, postCategory, doctor, status, dateOfBirth, age, timeSchedule, dateSchedule, phone, appointId } = this.state;

    const data = {
      topic: topic,
      description: description,
      postCategory: postCategory,
      doctor: doctor,
      status: status,
      dateOfBirth: dateOfBirth,
      age: age,
      timeSchedule: timeSchedule,
      dateSchedule: dateSchedule,
      phone: phone,
      appointId: appointId
    };

    console.log(data);

    axios.post("/appointment/save", data).then((res) =>{
      if(res.data.success){
        this.setState(
          {
            topic:"",
            description:"",
            postCategory:"",
            doctor: "",
            status: "",
            dateOfBirth: "",
            age: "",
            timeSchedule: "",
            dateSchedule: "",
            phone: "",
            appointId: ""
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
        <h1 className='text-2xl font-bold mb-4  text-green-700'>Create New Appointment</h1>
        <form className="needs-validation bg-white sm:rounded-lg p-10" noValidate>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px', marginRight: '12px' , fontWeight: '600'}}>Appointment ID</label>
            <input type="text"
              className="form-control rounded-full p-2 text-gray-500"
              name="appointId"
              placeholder="Enter Appointment ID"
              value={this.state.appointId}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' , marginRight: '12px' , fontWeight: '600'}}>Patients' Name</label>
            <input type="text"
              className="form-control rounded-full p-2 text-gray-500"
              name="topic"
              placeholder="Enter Patient's Name"
              value={this.state.topic}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' , marginRight: '12px' , fontWeight: '600'}}>Patients' NIC</label>
            <input type="text"
              className="form-control rounded-full p-2 text-gray-500"
              name="description"
              maxLength={12}
              placeholder="Enter Patient's NIC"
              value={this.state.description}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' , marginRight: '12px', fontWeight: '600' }}>Contact No</label>
            <input type="text"
              className="form-control rounded-full p-2 text-gray-500"
              name="phone"
              placeholder="Enter Contact No"
              maxLength={10}
              value={this.state.phone}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' , marginRight: '12px', fontWeight: '600' }}>Birth Date</label>
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
            <label style={{ marginBottom: '5px' , marginRight: '12px' , fontWeight: '600'}}>Patients' Age</label>
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
            <label htmlFor="specialization" style={{ marginBottom: '5px' , marginRight: '12px' , fontWeight: '600'}}>Specailization</label>
            <select
              className="form-control rounded-full p-2 text-gray-500"
              id="specialization"
              name="postCategory"
              value={this.state.postCategory}
              onChange={this.handleInputChange}
              
            >
              {/* List of options for ward types */}
              <option value="">Select Category</option>
              <option value="Ayurveda Consultant">Ayurveda Consultant</option>
              <option value="Cardiologist">Cardio</option>
              <option value="Gastroenterologst">Gastroenterologst</option>
              <option value="Physician">Physician</option>
              <option value="Dentist">Dentist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Eye Surgeon">Eye Surgeon</option>
              <option value="Facial Surgeon">Facial Surgeon</option>
              <option value="Dietician">Dietician</option>
              <option value="Nutritionist">Nutritionist</option>
              <option value="Physician">Physician</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="Fertility Consultant">Fertility Consultant</option>
              <option value="Special Education Need Consultant">Special Education Need Consultant</option>
            </select>
          </div>


          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="doctor" style={{ marginBottom: '5px' , marginRight: '12px' , fontWeight: '600'}}>Doctor/Specialist</label>
            <select
              className="form-control rounded-full p-2 text-gray-500"
              id="doctor"
              name="doctor"
              value={this.state.doctor}
              onChange={this.handleInputChange}
              
            >
              {/* List of options for ward types */}
              <option value="">Select Doctor/Specialist</option>
              <option value="Sunimala Sooriya Kasthuriarachchi">Sunimala Sooriya Kasthuriarachchi</option>
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


          {/* <div class="md:col-span-2 xl:col-span-3 2xl:col-span-2"><div class=" text-sm mb-2">Doctor name</div><div class="relative"><input autocomplete="off" class="w-full rounded-xl py-3 px-4 text-sm focus:outline-none border-primaryDarkBlue border bg-white text-left pr-9" placeholder="Search Doctor Name" id="headlessui-combobox-input-:r7iv:" role="combobox" aria-expanded="true" aria-autocomplete="list" data-headlessui-state="open" type="text" value="" aria-controls="headlessui-combobox-options-:rb42:"/><button class="absolute inset-y-0 right-0 flex items-center pr-4" id="headlessui-combobox-button-:r7j0:" type="button" tabindex="-1" aria-haspopup="listbox" aria-expanded="true" data-headlessui-state="open" aria-controls="headlessui-combobox-options-:rb42:"></button><ul class="w-full rounded-xl text-sm overflow-y-scroll max-h-72 focus:outline-none absolute z-20 mt-2 shadow-md bg-white text-left py-3 scrollbar-hide" aria-labelledby="headlessui-combobox-button-:r7j0:" role="listbox" id="headlessui-combobox-options-:rb42:" data-headlessui-state="open"><li class="cursor-not-allowed py-2 px-4" id="headlessui-combobox-option-:rb43:" role="option" aria-disabled="true" aria-selected="false" data-headlessui-state="disabled">No results</li></ul></div></div> */}

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' , marginRight: '12px', fontWeight: '600' }}>Schedule Date</label>
            <input type="date"
              className="form-control rounded-full p-2 text-gray-500"
              name="dateSchedule"
              placeholder="Select date"
              min={
                new Date().toISOString().split('T')[0]
               }
              value={this.state.dateSchedule}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' , marginRight: '12px' , fontWeight: '600'}}>Schedule Time</label>
            <input type="time"
              className="form-control rounded-full p-2 text-gray-500"
              name="timeSchedule"
              placeholder="Select time"
              value={this.state.timeSchedule}
              onChange={this.handleInputChange} />
          </div>


          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="status" style={{ marginBottom: '5px' , marginRight: '12px' , fontWeight: '600'}}>Status</label>
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
