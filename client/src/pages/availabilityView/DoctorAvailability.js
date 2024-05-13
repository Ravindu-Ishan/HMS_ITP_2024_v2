
import React, { Component } from 'react';
import axios from 'axios';
import TopNavAppointmet from '../../components/TopNavAppointment';


export default class DoctorAvailability extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments:[],
      //selectedDoctor: null // Add selected doctor state
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


  // // Function to filter appointments by selected doctor
  // filterAppointmentsByDoctor(doctor) {
  //   return this.state.posts.filter(post => post.doctor === doctor);
  // }

  // // Handler for selecting a doctor
  // handleDoctorSelect = (doctor) => {
  //   this.setState({ selectedDoctor: doctor });
  // }



  onDelete = (id) =>{

    axios.delete(`/appointments/delete/${id}`).then((res) =>{
      alert("Delete successfully");
      this.retrievePosts();
    })
  }


  filterData(appointments,searchKey){

    const result = appointments.filter((appointment) =>
      appointment.doctor.toLowerCase().includes(searchKey) ||
      appointment.specialization.toLowerCase().includes(searchKey) ||
      appointment.date.toLowerCase().includes(searchKey) 
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
    //const { selectedDoctor } = this.state;
    return (
      <>

      <div className='navarea'>
          <TopNavAppointmet/>
        </div>

      <main>
       

      <div className="container">

        <div className="col-lg-3 mt-2 mb-2 font-bold">
        <h4>Doctors/Specialists</h4>
        </div>

        <div className="row">
          
          <div className="col-lg-3 mt-2 mb-2">
            <input
            className="form-control"
            type="search"
            placeholder="Doctor/Specialist"
            name="searchQuery"
            onChange={this.handleSearchArea}>
            </input>
          </div>

          <div className="col-lg-3 mt-2 mb-2">
            <input
            className="form-control"
            type="search"
            placeholder="Select Specialization"
            name="searchQuery"
            onChange={this.handleSearchArea}>
            </input>
          </div>

          <div className="col-lg-3 mt-2 mb-2">
            <input
            className="form-control"
            type="date"
            placeholder="Select Date"
            name="searchQuery"
            onChange={this.handleSearchArea}>
            </input>
          </div>

        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Doctor/Specialist</th>
              <th scope="col">Specialization</th>
              <th scope="col">Available Date</th>
              <th scope="col">Available Time</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
          {this.state.appointments.map((appointments, index) => (
            <tr key={index}>
              <th scope="row">{index+1}</th>

              <td>
                 {appointments.doctor}
              </td>

              <td>
                {appointments._id}
              </td>

              {/* <td>
                <a href={`/doctorPatientView/${appointments._id}`} style={{textDecoration:'none'}}>
                {appointments._id}
                </a>
                
              </td> */}

              <td>{appointments.topic}</td>
              <td>{appointments.description}</td>
             
              <td>
                {/* add a slot decrement method */}

                {/* <a className="btn btn-warning" href={`/doctorReschedule/${posts._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Reschedule
                </a> */}
                {/* &nbsp;
                <a className="btn btn-danger" href="#" onClick={() => this.onDelete(posts._id)}>
                  <i className="fas fa-trash"></i>&nbsp;Delete
                </a> */}
              </td>
            </tr>
          ))}
          </tbody>

        </table>

            {/* <button className="btn btn-success"><a href="/add" style={{textDecoration:'none', color:'white'}}> + New Appointment</a></button>
             */}
            {/* Render DoctorView for the selected doctor
          {selectedDoctor && (
          <DoctorView doctor={selectedDoctor} />
        )} */}

      </div>

      </main></>
    );
  }
}

//export default MyComponent;