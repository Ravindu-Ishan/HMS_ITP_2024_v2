import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar';


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
      <div className="container">
        <NavBar />
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
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Patient ID</th>
              <th scope="col">NIC</th>
              <th scope="col">Patient's Name</th>
              <th scope="col">Contact No</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.patients.map((patients, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={`/patient/${patients._id}`} style={{ textDecoration: 'none' }}>
                    {patients._id}
                  </a>
                </td>
                <td>{patients.topic}</td>
                <td>{patients.description}</td>
                <td>{patients.postCategory}</td>

                <td>
                  <a className="btn btn-warning" href={`/editpatient/${patients._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() => this.onDelete(patients._id)}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-success">
          <a href="/addpatient" style={{ textDecoration: 'none', color: 'white' }}> + Create New Patient</a>
        </button>
      </div>
    );
  }
}





