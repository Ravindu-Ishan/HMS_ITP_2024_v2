import axios from 'axios';
import React, { Component } from 'react';
import TopNavWard from '../../components/TopNavWards';

export default class Bed_Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient_ID: "",
      patient_name: "",
      ward_ID: "",
      bed_ID: "",
      bed_location: "",
      availableWardIDs: [] // State to hold the list of available ward IDs
    };
  }

  // Fetch available ward IDs from the API when the component mounts
  async componentDidMount() {
    try {
      const response = await axios.get('/ward-ids'); // Adjust the API endpoint as needed
      if (response.data.success) {
        this.setState({ availableWardIDs: response.data.wardIDs });
      } else {
        console.error('Failed to fetch ward IDs:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching ward IDs:', error);
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // Define the clearAll function to reset all input fields to their initial empty values
  clearAll = () => {
    this.setState({
      patient_ID: "",
      patient_name: "",
      ward_ID: "",
      bed_ID: "",
      bed_location: ""
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const data = { ...this.state };

    try {
      const response = await axios.post("/bed/save", data);

      if (response.data.success) {
        // Reset the form fields
        this.setState({
          patient_ID: "",
          patient_name: "",
          ward_ID: "",
          bed_ID: "",
          bed_location: ""
        });

        // Reset the form fields using the clearAll function
        this.clearAll();

        // Provide user feedback about successful submission
        alert("Bed created successfully!");
      } else {
        alert("Failed to create bed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const errorMessage = error.response.data.error || error.response.data.message;

        // Check if the error is due to a duplicate key
        if (error.response.status === 400 && errorMessage.includes('duplicate key error')) {
          alert("Bed ID already exists. Please choose a different Bed ID.");
        } else {
          console.error('Response error:', errorMessage);
          alert(`Error: ${errorMessage}`);
        }
      } else {
        // Generic error message for unexpected errors
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  render() {
    return (
      <>
        <div className="navarea">
          <TopNavWard />
        </div>
        <main>
          <div className="col-md-8 mt-4 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal">Assign New Patient</h1>
            <form className="needs-validation" noValidate onSubmit={this.onSubmit}>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="patientID" style={{ marginBottom: '5px' }}>Patient ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="patientID"
                  name="patient_ID"
                  placeholder="Enter patient ID"
                  value={this.state.patient_ID}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="patientName" style={{ marginBottom: '5px' }}>Patient Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="patientName"
                  name="patient_name"
                  placeholder="Enter patient name"
                  value={this.state.patient_name}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              {/* Dropdown for selecting Ward ID */}
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="wardID" style={{ marginBottom: '5px' }}>Ward ID</label>
                <select
                  className="form-control"
                  id="wardID"
                  name="ward_ID"
                  value={this.state.ward_ID}
                  onChange={this.handleInputChange}
                  required
                >
                  <option value="" disabled>Select Ward ID</option>
                  {this.state.availableWardIDs.map((wardID) => (
                    <option key={wardID} value={wardID}>{wardID}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="bedID" style={{ marginBottom: '5px' }}>Bed ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="bedID"
                  name="bed_ID"
                  placeholder="Enter bed ID"
                  value={this.state.bed_ID}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="bedLocation" style={{ marginBottom: '5px' }}>Bed Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="bedLocation"
                  name="bed_location"
                  placeholder="Enter bed location"
                  value={this.state.bed_location}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              {/* Add the Clear All button */}
              <button
                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="button"
                style={{ marginTop: '15px', marginRight: '10px' }}
                onClick={this.clearAll}
              >
                Clear All
              </button>

              <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit" style={{ marginTop: '15px' }}>
                <i className="far fa-check-square"></i>
                &nbsp; Assign and Save
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }
}
