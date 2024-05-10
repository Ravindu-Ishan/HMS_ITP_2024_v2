import React, { Component } from 'react';
import axios from 'axios';
import DoctorView from '../doctorViewComponent/DoctorView';
import TopNavAppointmet from '../../components/TopNavAppointment';

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
      <>
    
        <div className='navarea'>
          <TopNavAppointmet/>
        </div>
    
        <main>
          <div className="container">
            <div className="row">
              <div className="col-lg-9 mt-2 mb-2">
                <h2 className='font-bold'>Doctor Appointments</h2>
              </div>
    
              <div className="col-lg-9 mt-2 mb-2">
                <button className="text-white bg-green-700 hover:bg-green-500  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"><a href='/labAppointHome' style={{ textDecoration: 'none', color: 'inherit' }}>Service Appointments</a></button>
              </div>
    
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  name="searchQuery"
                  autoComplete='off'
                  onChange={this.handleSearchArea}
                />
              </div>
            </div>
    
            <div className="table-responsive overflow-x-auto sm:rounded-lg tablestyle"> {/* Adding this div for responsive table */}
              <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 table table-striped table-bordered"> {/* Adding Bootstrap table classes */}
                <thead className="text-xs text-gray-700 uppercase bg-white thead-dark"> {/* Adding dark background for table header */}
                  <tr>
                    <th className="p-3" scope="col">#</th>
                    <th className="p-3" scope="col">ID</th>
                    <th className="p-3" scope="col">Name</th>
                    <th className="p-3" scope="col">NIC</th>
                    <th className="p-3" scope="col">Category</th>
                    <th className="p-3" scope="col">Doctor/Specialist</th>
                    <th className="p-3" scope="col">Status</th>
                    <th className="p-3" scope="col">Actions</th> {/* Changed from empty header */}
                  </tr>
                </thead>
                <tbody>
                  {this.state.appointments.map((appointment, index) => (
                    <tr 
                      className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black"
                      key={index}
                    >
                      <td className="text-center py-2 px-4">{index + 1}</td>
                      <td className="text-center py-2 px-4">
                        <a href={`/appointment/${appointment._id}`} style={{ textDecoration: 'none' }}>
                          {appointment._id}
                        </a>
                      </td>
                      <td className="text-center py-2 px-4">
                        <a href={`/appointment/${appointment._id}`} style={{ textDecoration: 'none' }}>
                          {appointment.topic}
                        </a>
                      </td>
                      <td className="text-center py-2 px-4">{appointment.description}</td>
                      <td className="text-center py-2 px-4">{appointment.postCategory}</td>
                      <td className="text-center py-2 px-4">{appointment.doctor}</td>
                      <td className="text-center py-2 px-4">{appointment.status}</td>
                      <td className="text-center py-2 px-4">
                        <a className="btn btn-warning" href={`/editAppointment/${appointment._id}`}>
                          <i className="fas fa-edit"></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className="btn btn-danger" href="#" onClick={() => this.onDelete(appointment._id)}>
                          <i className="fas fa-trash"></i>&nbsp;Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    
            <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
              <a href="/createAppointment" style={{ textDecoration: 'none', color: 'white' }}> + New Appointment</a>
            </button>
    
            {/* Render DoctorView for the selected doctor */}
            {selectedDoctor && (
              <DoctorView doctor={selectedDoctor} />
            )}
          </div>
        </main>
    
      </>
    );
    
    
  }
}

//export default MyComponent;