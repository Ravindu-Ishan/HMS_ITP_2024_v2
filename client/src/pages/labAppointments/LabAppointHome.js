import React, { Component } from 'react';
import axios from 'axios';
import DoctorView from '../doctorViewComponent/DoctorView';
import TopNavAppointmet from '../../components/TopNavAppointment';


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
      <>

      <div className='navarea'>
        <TopNavAppointmet/>
      </div>

      <main>
      <div className="container">
    
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4 className="p-3 font-bold">Lab Appointments</h4>
          </div>
    
          <div className="col-lg-9 mt-2 mb-2">
            <button className="text-white bg-green-700 hover:bg-green-500  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"><a href='/'>Doctor Appointments</a></button>
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
    
        <div className="overflow-x-auto sm:rounded-lg tablestyle">
          <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-white">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">NIC</th>
                <th className="p-3">Service Type</th>
                <th className="p-3">Doctor/Specialist</th>
                <th className="p-3">Status</th>
                
              </tr>
            </thead>
            <tbody>
              {this.state.labApps.map((labApps, index) => (
                <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={index}>
                  <th className="text-center py-2 px-4" scope="row">{index+1}</th>
                  <td className="text-center py-2 px-4">
                    <a href={`/labApp/${labApps._id}`} style={{textDecoration:'none'}}>
                      {labApps._id}
                    </a>
                  </td>
                  <td className="text-center py-2 px-4">
                    <a href={`/labApp/${labApps._id}`} style={{textDecoration:'none'}}>
                      {labApps.pname}
                    </a>
                  </td>
                  <td className="text-center py-2 px-4">{labApps.nic}</td>
                  <td className="text-center py-2 px-4">{labApps.service}</td>
                  <td className="text-center py-2 px-4">{labApps.doctor}</td>
                  <td className="text-center py-2 px-4">{labApps.status}</td>
                  <td className="text-center py-2 px-4">
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
        </div>
    
        <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"><a href="/labAppointHome/labAppointCreate" style={{textDecoration:'none', color:'white'}}> + New Appointment</a></button>
        
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