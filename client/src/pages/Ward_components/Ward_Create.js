import axios from 'axios';
import React, { Component } from 'react';
import TopNavWard from '../../components/TopNavWards';

export default class Ward_Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ward_type: "",
      ward_ID: "",
      bed_count: "",
      special_requirements: "",
      inventory_details: "",
      doctor_specialist_ID: "",
      doctor_specialist_name: "",
      nurse_other_staff_ID: ""
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  clearAll = () => {
    this.setState({
      ward_type: "",
      ward_ID: "",
      bed_count: "",
      special_requirements: "",
      inventory_details: "",
      doctor_specialist_ID: "",
      doctor_specialist_name: "",
      nurse_other_staff_ID: ""
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const data = { ...this.state };

    try {
      const response = await axios.post("/ward/save", data);

      if (response.data.success) {
        // Reset the form fields
        this.setState({
          ward_type: "",
          ward_ID: "",
          bed_count: "",
          special_requirements: "",
          inventory_details: "",
          doctor_specialist_ID: "",
          doctor_specialist_name: "",
          nurse_other_staff_ID: ""
        });

        // Reset the form fields
        this.clearAll();

        // Provide user feedback about successful submission
        alert("Ward created successfully!");
      } else {
        alert("Failed to create ward. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const errorMessage = error.response.data.error || error.response.data.message;

        // Check if the error is due to a duplicate key
        if (error.response.status === 400 && errorMessage.includes('duplicate key error')) {
          alert("Ward ID already exists. Please enter a unique Ward ID.");
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
            <h1 className="h3 mb-3 font-weight-normal">Create New Ward</h1>
            <form className="needs-validation" noValidate onSubmit={this.onSubmit}>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="wardType" style={{ marginBottom: '5px' }}>Ward Type</label>
                <select
                  className="form-control"
                  id="wardType"
                  name="ward_type"
                  value={this.state.ward_type}
                  onChange={this.handleInputChange}
                  required
                >
                  {/* List of options for ward types */}
                  <option value="">Select ward type</option>
                  <option value="General">General</option>
                  <option value="ICU">ICU</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Maternity">Maternity</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Psychiatric">Psychiatric</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="wardID" style={{ marginBottom: '5px' }}>Ward ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="wardID"
                  name="ward_ID"
                  placeholder="Enter ward ID"
                  value={this.state.ward_ID}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="BedCount" style={{ marginBottom: '5px' }}>Bed Count</label>
                <input
                  type="number"
                  className="form-control"
                  id="BedCount"
                  name="bed_count"
                  placeholder="Enter bed count"
                  value={this.state.bed_count}
                  onChange={this.handleInputChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="specialRequirements" style={{ marginBottom: '5px' }}>Special Requirements</label>
                <input
                  type="text"
                  className="form-control"
                  id="specialRequirements"
                  name="special_requirements"
                  placeholder="Enter special requirements"
                  value={this.state.special_requirements}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="inventoryDetails" style={{ marginBottom: '5px' }}>Inventory Details</label>
                <input
                  type="text"
                  className="form-control"
                  id="inventoryDetails"
                  name="inventory_details"
                  placeholder="Enter inventory details"
                  value={this.state.inventory_details}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="DoctorSpecialistID" style={{ marginBottom: '5px' }}>Doctor/Specialist ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="DoctorSpecialistID"
                  name="doctor_specialist_ID"
                  placeholder="Enter doctor/specialist ID"
                  value={this.state.doctor_specialist_ID}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="DoctorSpecialistName" style={{ marginBottom: '5px' }}>Doctor/Specialist Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="DoctorSpecialistName"
                  name="doctor_specialist_name"
                  placeholder="Enter doctor/specialist name"
                  value={this.state.doctor_specialist_name}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="NurseOtherStaffIDs" style={{ marginBottom: '5px' }}>Nurses/Other Staff Member IDs</label>
                <input
                  type="text"
                  className="form-control"
                  id="NurseOtherStaffIDs"
                  name="nurse_other_staff_ID"
                  placeholder="Enter IDs for nurses/other staff members"
                  value={this.state.nurse_other_staff_ID}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              {/* Clear All button */}
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
                &nbsp; Create and Save
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }
}
