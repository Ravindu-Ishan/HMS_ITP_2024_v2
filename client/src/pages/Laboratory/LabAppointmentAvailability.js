import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import TopNavLabo from '../../components/TopNavLabo';

export default class LabAppointmentAvailability extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        labApps: [],
        //selectedDoctor: null // Add selected doctor state
      };
    }
  
    componentDidMount() {
      this.retrievePosts();
    }


//get request
retrievePosts(){
    axios.get("/labApps").then(res =>{
      if(res.data.success){
        this.setState({
          labApps:res.data.existingLabApps
        });

        console.log(this.state.labApps);
      }
    });
  }

  filterData(LabApps, searchKey) {

    const result = LabApps.filter((LabApps) =>
      LabApps.service.toLowerCase().includes(searchKey)
    )

    this.setState({ LabApps: result })

  }

  handleSearchArea = (e) => {

    const searchKey = e.currentTarget.value;

    axios.get("/labApps").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingLabApps, searchKey)
      }
    });

  }

  render() {
    
    return (
      <>
        <div className='navarea'>
          <TopNavLabo />
        </div>

        <main>
          <div className="container">
            <h3 className="p-3 text-2xl font-bold text-gray-800 ml-2">Laboratory Appointment Availability</h3>

            <div className="ml-8 row">
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="appearance-none block w-400 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="search"
                  placeholder="Service"
                  name="searchQuery"
                  onChange={this.handleSearchArea} />
              </div>
            </div>

            <div className="table-responsive overflow-x-auto sm:rounded-lg tablestyle">
              <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 table table-striped table-bordered">
                <thead className="text-xs text-gray-700 uppercase bg-white thead-dark">
                  <tr>
                    <th className="p-3" scope="col">Index Number</th>
                    <th className="p-3" scope="col">patient Name</th>
                    <th className="p-3" scope="col">Lab Test Type</th>
                    <th className="p-3" scope="col">Docter Information</th>
                    <th className="p-3" scope="col">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.labApps.map((labApp, index) => (
                  <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={labApp._id}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{labApp.pname}</td>
                  <td className="p-3">{labApp.service}</td>
                  <td className="p-3">{labApp.doctor}</td>
                  <td className="p-3">{labApp.status}</td>
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

