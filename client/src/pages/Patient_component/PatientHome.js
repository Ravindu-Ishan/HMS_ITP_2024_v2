import React, { Component } from 'react';
import axios from 'axios';

//importing top navigation bar components
import TopNavPatient from '../../components/TopNavPatient';

export default class PatientHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/patients")
      .then(res => {
        if (res.data.success) {
          this.setState({
            patients: res.data.existingPatients
          });
        }
      })
      .catch(error => {
        console.error('Error retrieving patients:', error);
        // Handle error state here
      });
  }

  onDelete = (id) => {
    axios.delete(`/patient/delete/${id}`).then((res) => {
      alert("Delete Successfully");
      this.retrievePosts();
    });
  }

  filterData(patients, searchKey) {
    const result = patients.filter((patient) =>
      patient.topic.toLowerCase().includes(searchKey) ||
      patient.description.toLowerCase().includes(searchKey) ||
      patient.postCategory.toLowerCase().includes(searchKey)
    );
    this.setState({ patients: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/patients").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingPatients, searchKey);
      }
    });
  }

  render() {
    return (
      <>

      {/* top nav imported to this section */}
      <div className="navarea">
        <TopNavPatient/>
      </div>

<main>      
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Patients</h4>
          </div>

          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
          </div>
        </div>
        
        </div>


  <div className="overflow-x-auto sm:rounded-lg tablestyle">
  <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
  <thead className="text-xs text-gray-700 uppercase bg-white">      
        
      <tr>
              <th className="p-1">No</th>
              <th className="p-1">Patient ID</th>
              <th className="p-1">NIC</th>
              <th className="p-1">Patient's Name</th>
              <th className="p-1">Contact No</th>
              <th className="p-1s">Actions</th>
              
      </tr>
  </thead>
  <tbody>
  {this.state.patients.map((patients, index) => (
    <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={index}>
      <th scope="row">{index + 1}</th>
      <td className="text-center py-2 px-2">
        <a href={`/patient/${patients._id}`}>{patients._id}</a>
      </td>
      <td className="text-center py-2 px-2"> 
        {patients.topic}
      </td>
      <td className="text-center py-2 px-2"> 
        {patients.description}
      </td>
      <td className="text-center py-2 px-2"> 
        {patients.postCategory}
      </td>
      <td className="flex space-x-4 py-2 px-2">
        <a className="btn btn-primary" href={`/editpatient/${patients._id}`}>
          <i className="fas fa-edit"></i>&nbsp;Edit
        </a>
        <button className="btn btn-danger" onClick={() => this.onDelete(patients._id)}>
          <i className="fas fa-trash-alt"></i>&nbsp;Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>


          </table>
        <div className="flex justify-center items-center h-screen">
              <button className="bg-cyan-400 text-black rounded-full px-4 py-2 border-1 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500">
                      <a href="/addpatient"> + Create New Patient</a>
              </button>
</div>

      </div>
</main>
      </>
    );
  }
}






