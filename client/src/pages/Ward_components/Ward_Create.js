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

            <form className="needs-validation" noValidate onSubmit={this.onSubmit}>

              <h1 className="text-3xl font-bold text-gray-800 ml-2">Create New Ward</h1>

              <form className="max-w-sm mx-auto">

                <div className="form-group mb-5">
                  <label htmlFor="wardType" className="mb-1 block text-gray-600 font-medium">Ward Type</label>
                  <div className="relative">
                    <select
                      className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
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
                </div>


                <div className="form-group mb-5">
                  <label htmlFor="wardID" className="mb-1 block text-gray-600 font-medium">Ward ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                      id="wardID"
                      name="ward_ID"
                      placeholder="Enter ward ID"
                      value={this.state.ward_ID}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-5">
                  <label htmlFor="BedCount" className="mb-1 block text-gray-600 font-medium">Bed Count</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                      id="BedCount"
                      name="bed_count"
                      placeholder="Enter bed count"
                      value={this.state.bed_count}
                      onChange={this.handleInputChange}
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-group mb-5">
                  <label htmlFor="specialRequirements" className="mb-1 block text-gray-600 font-medium">Special Requirements</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                      id="specialRequirements"
                      name="special_requirements"
                      placeholder="Enter special requirements"
                      value={this.state.special_requirements}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group mb-5">
                  <label htmlFor="inventoryDetails" className="mb-1 block text-gray-600 font-medium">Inventory Details</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                      id="inventoryDetails"
                      name="inventory_details"
                      placeholder="Enter inventory details"
                      value={this.state.inventory_details}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group mb-5">
                  <label htmlFor="DoctorSpecialistID" className="mb-1 block text-gray-600 font-medium">Doctor/Specialist ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                      id="DoctorSpecialistID"
                      name="doctor_specialist_ID"
                      placeholder="Enter doctor/specialist ID"
                      value={this.state.doctor_specialist_ID}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-5">
                  <label htmlFor="DoctorSpecialistName" className="mb-1 block text-gray-600 font-medium">Doctor/Specialist Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                      id="DoctorSpecialistName"
                      name="doctor_specialist_name"
                      placeholder="Enter doctor/specialist name"
                      value={this.state.doctor_specialist_name}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-5">
                  <label htmlFor="NurseOtherStaffIDs" className="mb-1 block text-gray-600 font-medium">Nurses/Other Staff Member IDs</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                      id="NurseOtherStaffIDs"
                      name="nurse_other_staff_ID"
                      placeholder="Enter IDs for nurses/other staff members"
                      value={this.state.nurse_other_staff_ID}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
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

                <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                  type="submit"
                  style={{ marginTop: '15px' }}
                  onClick={this.onSubmit}>
                  <i className="far fa-check-square"></i>
                  &nbsp; Create and Save
                </button>
              </form>
            </form>
          </div>
        </main>
      </>

    );
  }
}