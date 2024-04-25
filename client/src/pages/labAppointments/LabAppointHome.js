import React, { Component } from 'react';
import axios from 'axios';
import DoctorView from '../doctorViewComponent/DoctorView';


export default class LabAppointHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labApps:[],
      selectedDoctor: null // Add selected doctor state
    };
  }

  componentDidMount(){
    this.retrievePosts();
  }


  //get request
  retrievePosts(){
    axios.get("/labApps").then(res =>{
      if(res.data.success){
        this.setState({
          labApps:res.data.existingLabApps
        });

        console.log(this.state.labApps);
      }
    });
  }


  // Function to filter appointments by selected doctor
  filterAppointmentsByDoctor(doctor) {
    return this.state.labApps.filter(labApp => labApp.doctor === doctor);
  }

  // Handler for selecting a doctor
  handleDoctorSelect = (doctor) => {
    this.setState({ selectedDoctor: doctor });
  }



  onDelete = (id) =>{

    axios.delete(`/labApp/delete/${id}`).then((res) =>{
      alert("Delete successfully");
      this.retrievePosts();
    })
  }


  filterData(labApps,searchKey){

    const result = labApps.filter((labApp) =>
      labApp.pname.toLowerCase().includes(searchKey) ||
      labApp.nic.toLowerCase().includes(searchKey) ||
      labApp.service.toLowerCase().includes(searchKey) ||
      labApp.status.toLowerCase().includes(searchKey)
    )

    this.setState({labApps:result})

  }


  handleSearchArea = (e) =>{

    const searchKey = e.currentTarget.value;

    axios.get("/labApps").then(res =>{
      if(res.data.success){
        this.filterData(res.data.existingLabApps, searchKey)
      }
    });

  }

  render() {
    const { selectedDoctor } = this.state;
    return (

      <div className="container">

        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
          <h4>Lab Appointments</h4>
          </div>

          <div className="col-lg-9 mt-2 mb-2">
          <button><a href='/'>Doctor Appointments</a></button>
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
          {this.state.labApps.map((labApps, index) => (
            <tr key={index}>
              <th scope="row">{index+1}</th>

              <td>
                <a href={`/labApp/${labApps._id}`} style={{textDecoration:'none'}}>
                {labApps._id}
                </a>
                
              </td>

              <td>
                <a href={`/labApp/${labApps._id}`} style={{textDecoration:'none'}}>
                {labApps.pname}
                </a>
                
              </td>

              <td>{labApps.nic}</td>
              <td>{labApps.service}</td>
              <td>{labApps.doctor}</td>
              <td>{labApps.status}</td>
              
              <td>
                <a className="btn btn-warning" href={`/labAppointHome/labAppointEdit/${labApps._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </a>
                &nbsp;
                <a className="btn btn-danger" href="#" onClick={() => this.onDelete(labApps._id)}>
                  <i className="fas fa-trash"></i>&nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
          </tbody>

        </table>

            <button className="btn btn-success"><a href="/labAppointHome/labAppointCreate" style={{textDecoration:'none', color:'white'}}> + New Appointment</a></button>
            
            {/* Render DoctorView for the selected doctor */}
          {selectedDoctor && (
          <DoctorView doctor={selectedDoctor} />
        )}

      </div>
    );
  }
}

//export default MyComponent;