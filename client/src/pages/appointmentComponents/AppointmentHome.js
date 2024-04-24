import React, { Component } from 'react';
import axios from 'axios';
import DoctorView from '../doctorViewComponent/DoctorView';

export default class AppointmentHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments:[],
      selectedDoctor: null // Add selected doctor state
    };
  }

  componentDidMount(){
    this.retrievePosts();
  }


  //get request
  retrievePosts(){
    axios.get("/appointments").then(res =>{
      if(res.data.success){
        this.setState({
          appointments:res.data.existingAppointments
        });

        console.log(this.state.appointments);
      }
    });
  }


  // Function to filter appointments by selected doctor
  filterAppointmentsByDoctor(doctor) {
    return this.state.appointments.filter(appointment => appointment.doctor === doctor);
  }

  // Handler for selecting a doctor
  handleDoctorSelect = (doctor) => {
    this.setState({ selectedDoctor: doctor });
  }



  onDelete = (id) =>{

    axios.delete(`/appointment/delete/${id}`).then((res) =>{
      alert("Delete successfully");
      this.retrievePosts();
    })
  }


  filterData(appointments,searchKey){

    const result = appointments.filter((appointment) =>
      appointment.topic.toLowerCase().includes(searchKey) ||
      appointment.description.toLowerCase().includes(searchKey) ||
      appointment.postCategory.toLowerCase().includes(searchKey) ||
      appointment.status.toLowerCase().includes(searchKey)
    )

    this.setState({appointments:result})

  }


  handleSearchArea = (e) =>{

    const searchKey = e.currentTarget.value;

    axios.get("/appointments").then(res =>{
      if(res.data.success){
        this.filterData(res.data.existingAppointments, searchKey)
      }
    });

  }

  render() {
    const { selectedDoctor } = this.state;
    return (

      <div className="container">

        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
          <h4>Doctor Appointments</h4>
          </div>

          <div className="col-lg-9 mt-2 mb-2">
          <button><a href='/labAppointHome'>Service Appointments</a></button>
          </div>

          <div className="col-lg-3 mt-2 mb-2">
            <input
            className="form-control"
            type="search"
            placeholder="Search"
            name="searchQuery"
            autoComplete='off'
            onChange={this.handleSearchArea}>

            </input>
          </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">NIC</th>
              <th scope="col">Category</th>
              <th scope="col">Doctor/Specialist</th>
              <th scope="col">Status</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
          {this.state.appointments.map((appointments, index) => (
            <tr key={index}>
              <th scope="row">{index+1}</th>

              <td>
                <a href={`/appointment/${appointments._id}`} style={{textDecoration:'none'}}>
                {appointments._id}
                </a>
                
              </td>

              <td>
                <a href={`/appointment/${appointments._id}`} style={{textDecoration:'none'}}>
                {appointments.topic}
                </a>
                
              </td>

              <td>{appointments.description}</td>
              <td>{appointments.postCategory}</td>
              <td>{appointments.doctor}</td>
              <td>{appointments.status}</td>
              
              <td>
                <a className="btn btn-warning" href={`/editAppointment/${appointments._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </a>
                &nbsp;
                <a className="btn btn-danger" href="#" onClick={() => this.onDelete(appointments._id)}>
                  <i className="fas fa-trash"></i>&nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
          </tbody>

        </table>

            <button className="btn btn-success"><a href="/createAppointment" style={{textDecoration:'none', color:'white'}}> + New Appointment</a></button>
            
            {/* Render DoctorView for the selected doctor */}
          {selectedDoctor && (
          <DoctorView doctor={selectedDoctor} />
        )}

      </div>
    );
  }
}

//export default MyComponent;