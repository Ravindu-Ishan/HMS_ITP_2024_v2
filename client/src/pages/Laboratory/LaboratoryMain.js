import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TopNavLabo from "../../components/TopNavLabo"

export default class LaboratoryMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      laboratory: [],
    };
  }

  componentDidMount() {
    this.retrievelaboratory();
  }

  //get request
  retrievelaboratory() {
    axios.get("/laboratory")
      .then(res => {
        console.log(res.data)
        if (res.data.success) {
          this.setState({
          laboratory: res.data.existingLabData
        });
        console.log(this.state.laboratory);
        }
      })
      .catch(error => {
        console.error("Error retrieving lab test appointment:", error);
      });
  };

  onDelete = (id) => {
    axios.delete(`/laboratory/delete/${id}`).then((res) => {
      alert("Delete successfully");
      this.retrievelaboratory();
    }).catch(error => {
      console.error("Error deleting lab test appointment:", error);
    });
  }

  //search function
  filterData(laboratory, searchkey) {
    const result = laboratory.filter(laboratory =>
      laboratory.patient_ID.toLowerCase().includes(searchkey)
    );
    this.setState({laboratory: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("/laboratory")
      .then(res => {
        if (res.data.success) {
          this.filterData(res.data.existingLabData, searchKey);
        }
      })
      .catch(error => {
        console.error('Error retrieving laboratory:', error);
      });
  }
  
  render(){
  return (
    <>
    <div className='navarea'>
      <TopNavLabo />
    </div>
  <main>
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2 d-flex align-items-center">
          <h4 className="text-3xl font-bold text-gray-800 ml-2">Lab Test Appointments</h4>
          <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ml-2">
            <Link to ="/addnewappointment" style={{ textDecoration: 'none', color: 'white' }}>
              Add New Appointment
            </Link>
          </button>
        </div>
        <div className="ml-2 mt-5 col-lg-3 d-flex align-items-center justify-content-end">
          <input
            className="appearance-none block w-300 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ml-2"
            type="search"
            placeholder="Search"
            name="searchQuery"
            onChange={this.handleSearchArea}
          />
        </div>
      </div>
      <div className="overflow-x-auto sm:rounded-lg">
        <table className="table table-hover w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500" style={{ marginTop: '40px' }}>
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr>
              <th className="p-3" scope="col">Index No</th>
              <th className="p-3" scope="col">Patient Name</th>
              <th className="p-3" scope="col">Patient ID</th>
              <th className="p-3" scope="col">Test ID</th>
              <th className="p-3" scope="col">Doctor Information</th>
              <th className="p-3" scope="col">Test Type</th>
              <th className="p-3" scope="col">Test Description</th>
              <th className="p-3" scope="col">Test Date & Time</th>
              <th className="p-3" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.laboratory.map((laboratory, index) => (
              <tr key={index} className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black">
                <th scope="row" className="text-center py-2 px-4">{index + 1}</th>
                <td className="text-center py-2 px-4">
                  <Link
                    to={`/laboratorytestappointment/${laboratory._id}`}
                    style={{ textDecoration: 'none', color: '#000', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.target.style.color = '#007bff'; }}
                    onMouseLeave={(e) => { e.target.style.color = '#000'; }}
                  >
                    {laboratory.patient_name}
                  </Link>
                </td>
                <td className="text-center py-2 px-4">{laboratory.patient_ID}</td>
                <td className="text-center py-2 px-4">{laboratory.test_ID}</td>
                <td className="text-center py-2 px-4">{laboratory.doctor_info}</td>
                <td className="text-center py-2 px-4">{laboratory.test_type}</td>
                <td className="text-center py-2 px-4">{laboratory.test_description}</td>
                <td className="text-center py-2 px-4">{laboratory.test_date}</td>
                {/* <td className="text-center py-2 px-4">{laboratory.test_time}</td> */}
                <td className="text-center py-2 px-4">
                  <Link
                    className="text-blue-700 font-medium text-sm px-2 py-2.5 text-center"
                    to={`/edittestappointment/${laboratory._id}`}
                    style={{ transition: 'transform 0.2s', display: 'inline-block' }}
                    onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </Link>
                  <button
                    className="text-red-700 font-medium rounded-full text-sm px-2 py-2.5 text-center"
                    href="#"
                    onClick={() => this.onDelete(laboratory._id)}
                    style={{ transition: 'transform 0.2s', display: 'inline-block' }}
                    onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                  >
                    <i className="fas fa-trash"></i>&nbsp;Delete
                  </button>
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
