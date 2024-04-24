import React, { Component } from 'react';
import axios from 'axios';

export default class Bed_Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beds: []
    };
  }

  componentDidMount() {
    this.retrieveBeds();
  }

  //get request
  retrieveBeds() {
    axios.get("/beds")
      .then(res => {
        if (res.data.success) {
          this.setState({
            beds: res.data.existingBeds
          });
          console.log(this.state.beds);
        }
      })
      .catch(error => {
        console.error('Error retrieving beds:', error);
      });
  }

  onDelete = (id) => {

    axios.delete(`/bed/delete/${id}`).then((res) => {
      alert("Delete successfully");
      this.retrieveBeds();
    })
  }

  //search function
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
  
    axios.get("/beds")
      .then(res => {
        if (res.data.success) {
          // Log the existing beds for debugging
          console.log('Existing beds:', res.data.existingBeds);
  
          // Filter beds based on search key
          const filteredBeds = res.data.existingBeds.filter(bed => {
            // Check each property separately
            const wardIDMatch = bed.ward_ID.toLowerCase().includes(searchKey);
            const BedIDMatch = bed.bed_ID.toLowerCase().includes(searchKey);
            const BedLocationMatch = bed.bed_location.toLowerCase().includes(searchKey);
            const patientIDMatch = bed.patient_ID.toLowerCase().includes(searchKey);
            const patientNameMatch = bed.patient_name.toLowerCase().includes(searchKey);

            return wardIDMatch || BedIDMatch || BedLocationMatch || patientIDMatch || patientNameMatch;
          });
  
          // Log the filtered beds for debugging
          console.log('Filtered beds:', filteredBeds);
  
          // Update state with filtered beds
          this.setState({ beds: filteredBeds });
        } else {
          console.error('API response unsuccessful:', res.data);
        }
      })
      .catch(error => {
        console.error('Error retrieving beds:', error);
      });
  };
  

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Patients & Beds</h4>
            <div className="col-lg-3 mt-2 mb-2">
              <input
                className="form-control"
                type="search"
                placeholder="search"
                name="searchQuery"
                onChange={this.handleSearchArea}>
              </input>
            </div>
          </div>
        </div>
        <table className="table table-hover" style={{ marginTop: '40px' }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ward_ID</th>
              <th scope="col">bed_ID</th>
              <th scope="col">bed_location</th>
              <th scope="col">patient_ID</th>
              <th scope="col">patient_name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.beds.map((beds, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a href={`/bedDetails/${beds._id}`} style={{ textDecoration: 'none' }}>
                      {beds.ward_ID}
                    </a>
                  </td>
                  <td>{beds.bed_ID}</td>
                  <td>{beds.bed_location}</td>
                  <td>{beds.patient_ID}</td>
                  <td>{beds.patient_name}</td>
                  <td>
                    <a className="btn btn-warning" href={`/editBed/${beds._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a className="btn btn-danger" href="#" onClick={() => this.onDelete(beds._id)}>
                      <i className="fas fa-trash"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

        <button className="btn btn-success">
          <a href="/addBed" style={{ textDecoration: 'none', color: 'white' }}>
            Assign new Patients
          </a>
        </button>

      </div>
    );
  }
}
