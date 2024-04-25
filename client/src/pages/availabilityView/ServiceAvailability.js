
import React, { Component } from 'react';
import axios from 'axios';


export default class ServiceAvailability extends Component {
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



  filterData(appointments,searchKey){

    const result = appointments.filter((appointment) =>
    appointment.service.toLowerCase().includes(searchKey)
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

      <div className="container">

        <div className="col-lg-3 mt-2 mb-2 font-bold">
        <h4>Services</h4>
        </div>

        <div className="row">
          
          <div className="col-lg-3 mt-2 mb-2">
            <input
            className="form-control"
            type="search"
            placeholder="Service"
            name="searchQuery"
            onChange={this.handleSearchArea}>
            </input>
          </div>

        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Service</th>
              <th scope="col">Fee</th>
              <th scope="col">Location</th>
              

            </tr>
          </thead>
          <tbody>
          {this.state.appointments.map((appointments, index) => (
            <tr key={index}>
              <th scope="row">{index+1}</th>

              <td>
                 <a href={`/doctorPatientView/${appointments._id}`} style={{textDecoration:'none'}}>
                {appointments._id}
                </a>
              </td>

              <td>
                {appointments.doctor}
                
              </td>

              <td>{appointments.topic}</td>
              
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
    );
  }
}

//export default MyComponent;