import React, { Component } from 'react';
import axios from 'axios';
import TopNavPatientProfile from '../../components/TopNavPatientProfile';


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
      <>

      {/* top nav imported to this section */}
      <div className="navarea">
        <TopNavPatientProfile/>
      </div>
      <main>
      <div className="container">
        
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
              onChange={this.handleSearchArea}

              />
              </div>
            </div>
            </div>

            <div className="overflow-x-auto sm:rounded-lg tablestyle">
            <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-white">

            <tr>
              <th className="p-1">No</th>
              <th className="p-1">Diagnosis</th>
              <th className="p-1">Date</th>
              <th className="p-1s">Actions</th>
              
      </tr>
  </thead>

          
          <tbody>
            {this.state.prescriptions.map((prescriptions, index) => (
              <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={index}>
                <th scope="row">{index + 1}</th>
                <td className="text-center py-2 px-2">
                  <a href={`/prescription/${prescriptions._id}`}>
                    {prescriptions.diagnosis}
                  </a>
                </td>
                
                <td className="text-center py-2 px-2"> 
                  {prescriptions.date}
                </td>
      
               

                <td className="flex space-x-4 py-2 px-2">
        <a className="btn btn-primary" href={`/editPrescriptions/${prescriptions._id}`}>
          <i className="fas fa-edit"></i>&nbsp;Edit
        </a>
        <button className="btn btn-danger" onClick={() => this.onDelete(prescriptions._id)}>
          <i className="fas fa-trash-alt"></i>&nbsp;Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
                
                
        </table>

        <div className="flex justify-center items-center h-screen">
              <button className="bg-cyan-400 text-black rounded-full px-4 py-2 border-1 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500">
                      <a href="/createPrescriptions"> + Create New Prescription</a>
              </button>
        </div>

        

      </div>
      </main>
      </>
    )
  }
}



