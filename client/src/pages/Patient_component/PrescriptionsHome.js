import React, { Component } from 'react';
import axios from 'axios';
import PatientNavBar from './PatientNavBar';


export default class PrescriptionsHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prescriptions: []
    };
  }

  componentDidMount() {
    this.retrievePrescriptions();
  }

  retrievePrescriptions() {
    axios.get("/prescriptions")
      .then(res => {
        if (res.data.success) {
          this.setState({
            prescriptions: res.data.existingPrescriptions
          });

          console.log(this.state.prescriptions);
        }

      })
      .catch(error => {
        console.error('Error retrieving prescriptions:', error);
      });
  }

  onDelete = (id) => {
    axios.delete(`/prescription/delete/${id}`).then((res) => {
      alert("Delete Successfully");
      this.retrievePrescriptions();
    })

  }

  filterData(prescriptions, searchKey) {
    const result = prescriptions.filter((post) =>
    prescriptions.date.includes(searchKey)||
    prescriptions.diagnosis.toLowerCase().includes(searchKey)  
      
    )
    this.setState({ prescriptions: result })
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/prescriptions").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingPrescriptions, searchKey)
      }

    });
  }

  render() {
    return (
      <div className="container">
        <PatientNavBar />
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Prescriptions</h4>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}>

            </input>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Prescription ID</th>
              <th scope="col">Diagnosis</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prescriptions.map((prescriptions, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={`/prescription/${prescriptions._id}`} style={{ textDecoration: 'none' }}>
                    {prescriptions._id}
                  </a>
                </td>
                <td>{prescriptions.diagnosis}</td>
                <td>{prescriptions.date}</td>
                
                
                
                <td>
                  <a className="btn btn-warning" href="/editPrescriptions">
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() => this.onDelete(prescriptions._id)}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-success"><a href="/createPrescriptions" style={{ textDecoration: 'none', color: 'white' }}> + Create New Prescription</a></button>

      </div>
    )
  }
}

{/*import React, { Component } from 'react';
import PatientNavBar from './PatientNavBar';

// Define the PrescriptionsHome component
class PrescriptionsHome extends Component {
  render() {
    return (
      <div>
        <PatientNavBar />
        <h1>Prescriptions Home</h1>
        <p>This is the Prescriptions Home page.</p>
      </div>
    );
  }
}

// Export the LabReports component
export default PrescriptionsHome;*/}


