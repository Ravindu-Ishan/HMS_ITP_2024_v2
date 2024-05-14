import React, { Component } from 'react';
import axios from 'axios';
import TopNavWard from '../../components/TopNavWards';

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
    if (window.confirm("Are you sure you want to delete this bed?")) {
      axios.delete(`/bed/delete/${id}`)
        .then((res) => {
          alert("Delete successful");
          this.retrieveBeds();
        })
        .catch((error) => {
          console.error('Error deleting bed:', error);
        });
    }
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
      <>
        <main>
          <div className="navarea">
            <TopNavWard />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-9 mt-2 mb-2 d-flex align-items-center">
                <h4 className="text-3xl font-bold text-gray-800 ml-2">Patients</h4>
                <div className="col-lg-3 mt-2 mb-2">
                  <input
                    className="appearance-none block w-300 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="search"
                    placeholder="Search"
                    name="searchQuery"
                    onChange={this.handleSearchArea} />
                </div>
              </div>
              <div className="ml-2 mt-5 col-lg-3 d-flex align-items-center justify-content-end">
                <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                  <a href="/addBed" style={{ textDecoration: 'none', color: 'white' }}>
                    Assign new Patients
                  </a>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto sm:rounded-lg">
              <table className="table table-hover w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500" style={{ marginTop: '40px' }}>
                <thead className="text-xs text-gray-700 uppercase bg-white">
                  <tr>
                    <th className="p-3" scope="col">#</th>
                    <th className="p-3" scope="col">Ward ID</th>
                    <th className="p-3" scope="col">Bed ID</th>
                    <th className="p-3" scope="col">Bed Location</th>
                    <th className="p-3" scope="col">Patient ID</th>
                    <th className="p-3" scope="col">Patient Name</th>
                    <th className="p-3" scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.beds.map((beds, index) => (
                    <tr key={index} className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black">
                      <th scope="row" className="text-center py-2 px-4">{index + 1}</th>

                      <td className="text-center py-2 px-4">
                        <a
                          href={`/bedDetails/${beds._id}`}
                          style={{
                            textDecoration: 'none',
                            color: '#000', // Set the default text color
                            transition: 'color 0.3s', // Add transition effect for color change
                          }}
                          onMouseEnter={(e) => { e.target.style.color = '#007bff'; }} // Change color on hover
                          onMouseLeave={(e) => { e.target.style.color = '#000'; }} // Revert color on mouse leave
                        >
                          {beds.ward_ID}
                        </a>
                      </td>

                      <td className="text-center py-2 px-4">{beds.bed_ID}</td>
                      <td className="text-center py-2 px-4">{beds.bed_location}</td>
                      <td className="text-center py-2 px-4">{beds.patient_ID}</td>
                      <td className="text-center py-2 px-4">{beds.patient_name}</td>

                      {/* edit and delete */}
                      <td className="text-center py-2 px-4">
                        <a
                          className="btn btn-warning"
                          href={`/editBed/${beds._id}`}
                          style={{ transition: 'transform 0.2s', display: 'inline-block' }}
                          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)'; }}
                          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                        >
                          <i className="fas fa-edit"></i>&nbsp;Edit
                        </a>

                        &nbsp;

                        <a
                          className="btn btn-danger"
                          href="#"
                          onClick={() => this.onDelete(beds._id)}
                          style={{ transition: 'transform 0.2s', display: 'inline-block' }}
                          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)'; }}
                          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                        >
                          <i className="fas fa-trash"></i>&nbsp;Delete
                        </a>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </>
    );

  }
}
