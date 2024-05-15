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
        <main className='bg-white'>
          <div className="container">
            <div className=" bg-white"> {/* Adding this div for responsive table */}
              <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-black bg-white table table-striped table-bordered"> {/* Adding Bootstrap table classes */}
                <thead className="text-xs text-black uppercase bg-white thead-dark"> {/* Adding dark background for table header */}
                  <tr>
                  
                    <th className="p-3" scope="col">No</th>
                    <th className="p-3" scope="col">NIC</th>
                    <th className="p-3" scope="col">Patient's Name</th>
                    <th className="p-3" scope="col">Age</th>
                    <th className="p-3" scope="col">Contact No</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {this.state.patients.map((patient, index) => (
                    <tr
                      className="text-black bg-white hover:bg-gray-200 hover:text-black"
                      key={index}
                    >
                      <td className="text-center py-2 px-4">{index + 1}</td>
                      <td className="text-center py-2 px-4">{patient.topic}</td>
                      <td className="text-center py-2 px-4">{patient.description}</td>
                      <td className="text-center py-2 px-4">{patient.age}</td>
                      <td className="text-center py-2 px-4">{patient.postCategory}</td>
                      
                      
                      
                      
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


