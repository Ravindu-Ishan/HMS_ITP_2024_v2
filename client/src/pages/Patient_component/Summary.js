import React, { Component } from 'react';
import axios from 'axios';
import TopNavPatient from '../../components/TopNavPatient';

export default class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
    };
  }

  componentDidMount() {
    this.retrievePatients();
  }

  retrievePatients() {
    axios.get(`/patients`)
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

  render() {
    const totalPatients = this.state.patients.length; // Calculate total patient count

    return (
      <>
        <TopNavPatient />

        <main>
          <div className="container">
            <h1 className="text-center mb-4 font-bold" style={{ fontSize: '1rem', backgroundColor: '#ADD8E6', color: '#333', padding: '10px', borderRadius: '5px' }}>Patient Summary Report</h1>

            <div className="table-responsive">
              <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-black"> {/* Add mx-auto class for horizontal centering */}
                <thead>
                  <tr>
                    <th className="p-1">No</th>
                    <th className="p-1">NIC</th>
                    <th className="p-1">Patient's Name</th>
                    <th className="p-1">Age</th>
                    <th className="p-1">Contact No</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.patients.map((patient, index) => (
                    <tr key={index} className="py-2"> {/* Add padding to each row */}
                      <th scope="row">{index + 1}</th>
                      <td className="text-center py-2 px-2">
                        {patient.topic}
                      </td>
                      <td className="text-center py-2 px-2">
                        {patient.description}
                      </td>
                      <td className="text-center py-2 px-2">
                        {patient.age}
                      </td>
                      <td className="text-center py-2 px-2">
                        {patient.postCategory}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>Total Patients: {totalPatients}</p> {/* Display total patient count */}
            <div className="text-center">
              
              <button className="btn btn-primary" onClick={() => window.print()}>
                Print Report
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }
  
}
